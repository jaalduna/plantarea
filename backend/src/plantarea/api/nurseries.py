"""Nurseries API endpoints."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from plantarea.models import Nursery, get_db
from plantarea.schemas import NurseryOut, NurseryUpdate, ProductOut, ReviewOut

router = APIRouter(prefix="/nurseries", tags=["nurseries"])


class NurseryDetailOut(NurseryOut):
    products: list[ProductOut] = []
    reviews: list[ReviewOut] = []


@router.get("", response_model=list[NurseryOut])
def list_nurseries(db: Session = Depends(get_db)) -> list[NurseryOut]:
    nurseries = (
        db.query(Nursery)
        .filter(Nursery.is_active.is_(True))
        .order_by(Nursery.rating.desc())
        .all()
    )
    return [NurseryOut.model_validate(n) for n in nurseries]


@router.get("/{nursery_id}", response_model=NurseryDetailOut)
def get_nursery(nursery_id: int, db: Session = Depends(get_db)) -> NurseryDetailOut:
    nursery = (
        db.query(Nursery)
        .options(joinedload(Nursery.products), joinedload(Nursery.reviews))
        .filter(Nursery.id == nursery_id)
        .first()
    )
    if not nursery:
        raise HTTPException(status_code=404, detail="Nursery not found")
    return NurseryDetailOut.model_validate(nursery)


@router.put("/{nursery_id}", response_model=NurseryOut)
def update_nursery(
    nursery_id: int, data: NurseryUpdate, db: Session = Depends(get_db)
) -> NurseryOut:
    nursery = db.query(Nursery).filter(Nursery.id == nursery_id).first()
    if not nursery:
        raise HTTPException(status_code=404, detail="Nursery not found")

    update_data = data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(nursery, key, value)

    db.commit()
    db.refresh(nursery)
    return NurseryOut.model_validate(nursery)


# --- Reviews sub-resource ---

from plantarea.models import Review  # noqa: E402
from plantarea.schemas import ReviewCreate  # noqa: E402


@router.get("/{nursery_id}/reviews", response_model=list[ReviewOut])
def list_reviews(nursery_id: int, db: Session = Depends(get_db)) -> list[ReviewOut]:
    nursery = db.query(Nursery).filter(Nursery.id == nursery_id).first()
    if not nursery:
        raise HTTPException(status_code=404, detail="Nursery not found")

    reviews = (
        db.query(Review)
        .filter(Review.nursery_id == nursery_id)
        .order_by(Review.created_at.desc())
        .all()
    )
    return [ReviewOut.model_validate(r) for r in reviews]


@router.post("/{nursery_id}/reviews", response_model=ReviewOut, status_code=201)
def create_review(
    nursery_id: int, data: ReviewCreate, db: Session = Depends(get_db)
) -> ReviewOut:
    nursery = db.query(Nursery).filter(Nursery.id == nursery_id).first()
    if not nursery:
        raise HTTPException(status_code=404, detail="Nursery not found")

    review = Review(
        nursery_id=nursery_id,
        author_name=data.author_name,
        rating=data.rating,
        comment=data.comment,
    )
    db.add(review)

    # Update nursery rating
    all_reviews = db.query(Review).filter(Review.nursery_id == nursery_id).all()
    total_rating = sum(r.rating for r in all_reviews) + data.rating
    count = len(all_reviews) + 1
    nursery.rating = round(total_rating / count, 2)
    nursery.review_count = count

    db.commit()
    db.refresh(review)
    return ReviewOut.model_validate(review)
