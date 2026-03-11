"""Categories API endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from plantarea.models import Category, Product, get_db
from plantarea.schemas import CategoryOut

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)) -> list[CategoryOut]:
    categories = db.query(Category).order_by(Category.name).all()
    result = []
    for cat in categories:
        count = db.query(Product).filter(
            Product.category_id == cat.id,
            Product.is_active.is_(True),
        ).count()
        out = CategoryOut.model_validate(cat)
        out.product_count = count
        result.append(out)
    return result
