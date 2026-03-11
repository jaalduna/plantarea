"""Orders API endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from plantarea.models import Order, OrderItem, Product, get_db
from plantarea.schemas import OrderCreate, OrderOut, OrderStatusUpdate

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=list[OrderOut])
def list_orders(
    nursery_id: int | None = None,
    status: str | None = None,
    db: Session = Depends(get_db),
) -> list[OrderOut]:
    query = db.query(Order)
    if nursery_id is not None:
        query = query.filter(Order.nursery_id == nursery_id)
    if status is not None:
        query = query.filter(Order.status == status)
    orders = query.order_by(Order.created_at.desc()).all()
    return [OrderOut.model_validate(o) for o in orders]


@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)) -> OrderOut:
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderOut.model_validate(order)


@router.post("", response_model=OrderOut, status_code=201)
def create_order(data: OrderCreate, db: Session = Depends(get_db)) -> OrderOut:
    # Resolve products and compute totals
    # Group items by nursery — one order per nursery
    product_ids = [item.product_id for item in data.items]
    products = db.query(Product).filter(Product.id.in_(product_ids)).all()
    product_map = {p.id: p for p in products}

    # Validate all products exist
    for item in data.items:
        if item.product_id not in product_map:
            raise HTTPException(
                status_code=400,
                detail=f"Product {item.product_id} not found",
            )

    # For simplicity, create one order per nursery in the cart
    nursery_items: dict[int, list] = {}
    for item in data.items:
        product = product_map[item.product_id]
        nid = product.nursery_id
        if nid not in nursery_items:
            nursery_items[nid] = []
        nursery_items[nid].append((product, item.quantity))

    created_orders = []
    for nursery_id, items in nursery_items.items():
        order_items = []
        total = 0
        for product, qty in items:
            subtotal = product.price * qty
            total += subtotal
            order_items.append(
                OrderItem(
                    product_id=product.id,
                    product_name=product.name,
                    product_image_url=product.image_url,
                    quantity=qty,
                    unit_price=product.price,
                    subtotal=subtotal,
                )
            )
            # Decrease stock
            product.stock = max(0, product.stock - qty)

        order = Order(
            buyer_name=data.buyer_name,
            buyer_email=data.buyer_email,
            buyer_phone=data.buyer_phone,
            shipping_address=data.shipping_address,
            notes=data.notes,
            nursery_id=nursery_id,
            total=total,
            items=order_items,
        )
        db.add(order)
        created_orders.append(order)

    db.commit()
    for o in created_orders:
        db.refresh(o)

    # Return the first order (multi-nursery orders return the first)
    return OrderOut.model_validate(created_orders[0])


@router.put("/{order_id}/status", response_model=OrderOut)
def update_order_status(
    order_id: int, data: OrderStatusUpdate, db: Session = Depends(get_db)
) -> OrderOut:
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = data.status.value
    db.commit()
    db.refresh(order)
    return OrderOut.model_validate(order)
