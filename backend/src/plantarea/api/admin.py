"""Admin API endpoints."""

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from plantarea.models import Nursery, Order, Product, get_db
from plantarea.schemas import AdminMetrics, NurseryOut

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/metrics", response_model=AdminMetrics)
def get_metrics(db: Session = Depends(get_db)) -> AdminMetrics:
    total_products = db.query(Product).count()
    total_nurseries = db.query(Nursery).filter(Nursery.is_active.is_(True)).count()
    total_orders = db.query(Order).count()
    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).scalar() or 0

    # Orders by status
    status_counts = (
        db.query(Order.status, func.count(Order.id))
        .group_by(Order.status)
        .all()
    )
    orders_by_status = {status: count for status, count in status_counts}

    # Top nurseries by revenue
    top = (
        db.query(
            Nursery,
            func.count(Order.id).label("order_count"),
            func.coalesce(func.sum(Order.total), 0).label("revenue"),
        )
        .outerjoin(Order, Order.nursery_id == Nursery.id)
        .group_by(Nursery.id)
        .order_by(func.sum(Order.total).desc().nullslast())
        .limit(5)
        .all()
    )

    top_nurseries = [
        {
            "nursery": NurseryOut.model_validate(nursery).model_dump(),
            "order_count": order_count,
            "revenue": revenue,
        }
        for nursery, order_count, revenue in top
    ]

    return AdminMetrics(
        total_products=total_products,
        total_nurseries=total_nurseries,
        total_orders=total_orders,
        total_revenue=total_revenue,
        orders_by_status=orders_by_status,
        top_nurseries=top_nurseries,
    )


@router.get("/nurseries", response_model=list[NurseryOut])
def list_all_nurseries(db: Session = Depends(get_db)) -> list[NurseryOut]:
    """List all nurseries (including inactive) for admin management."""
    nurseries = db.query(Nursery).order_by(Nursery.name).all()
    return [NurseryOut.model_validate(n) for n in nurseries]
