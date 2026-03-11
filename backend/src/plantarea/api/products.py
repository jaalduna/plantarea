"""Products API endpoints."""

import math
import re

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload

from plantarea.models import Product, get_db
from plantarea.schemas import (
    PaginatedResponse,
    ProductCreate,
    ProductOut,
    ProductUpdate,
)

router = APIRouter(prefix="/products", tags=["products"])


def _slugify(text: str) -> str:
    slug = text.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[-\s]+", "-", slug)
    return slug


@router.get("", response_model=PaginatedResponse[ProductOut])
def list_products(
    category_id: int | None = None,
    nursery_id: int | None = None,
    search: str | None = None,
    price_min: int | None = None,
    price_max: int | None = None,
    location: str | None = None,
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
) -> PaginatedResponse[ProductOut]:
    query = db.query(Product).options(
        joinedload(Product.category),
        joinedload(Product.nursery),
    ).filter(Product.is_active.is_(True))

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)
    if nursery_id is not None:
        query = query.filter(Product.nursery_id == nursery_id)
    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))
    if price_min is not None:
        query = query.filter(Product.price >= price_min)
    if price_max is not None:
        query = query.filter(Product.price <= price_max)
    if location:
        query = query.join(Product.nursery).filter(
            Product.nursery.property.mapper.class_.city.ilike(f"%{location}%")
        )

    total = query.count()
    items = query.order_by(Product.created_at.desc()).offset((page - 1) * per_page).limit(per_page).all()
    pages = math.ceil(total / per_page) if total > 0 else 1

    return PaginatedResponse(
        items=[ProductOut.model_validate(p) for p in items],
        total=total,
        page=page,
        per_page=per_page,
        pages=pages,
    )


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)) -> ProductOut:
    product = (
        db.query(Product)
        .options(joinedload(Product.category), joinedload(Product.nursery))
        .filter(Product.id == product_id)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.model_validate(product)


@router.post("", response_model=ProductOut, status_code=201)
def create_product(data: ProductCreate, db: Session = Depends(get_db)) -> ProductOut:
    product = Product(
        name=data.name,
        slug=_slugify(data.name),
        description=data.description,
        price=data.price,
        compare_at_price=data.compare_at_price,
        stock=data.stock,
        sku=data.sku,
        image_url=data.image_url,
        category_id=data.category_id,
        nursery_id=data.nursery_id,
    )
    product.images = data.images
    db.add(product)
    db.commit()
    db.refresh(product)
    return ProductOut.model_validate(product)


@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int, data: ProductUpdate, db: Session = Depends(get_db)
) -> ProductOut:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = data.model_dump(exclude_unset=True)
    if "name" in update_data:
        update_data["slug"] = _slugify(update_data["name"])
    if "images" in update_data:
        product.images = update_data.pop("images")

    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return ProductOut.model_validate(product)


@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: int, db: Session = Depends(get_db)) -> None:
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
