"""SQLAlchemy models for Plantarea marketplace."""

import json
from collections.abc import Generator
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    create_engine,
)
from sqlalchemy.orm import DeclarativeBase, Session, relationship, sessionmaker

from plantarea.config.settings import settings


class Base(DeclarativeBase):
    pass


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True)
    slug = Column(String(100), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    icon = Column(String(10), nullable=True)  # emoji icon

    products = relationship("Product", back_populates="category")


class Nursery(Base):
    __tablename__ = "nurseries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    slug = Column(String(200), nullable=False, unique=True)
    description = Column(Text, nullable=True)
    address = Column(String(500), nullable=True)
    city = Column(String(100), nullable=True)
    region = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(200), nullable=True)
    logo_url = Column(String(500), nullable=True)
    cover_url = Column(String(500), nullable=True)
    rating = Column(Float, default=0.0)
    review_count = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    products = relationship("Product", back_populates="nursery")
    orders = relationship("Order", back_populates="nursery")
    reviews = relationship("Review", back_populates="nursery")


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(300), nullable=False)
    slug = Column(String(300), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Integer, nullable=False)  # price in CLP (integer)
    compare_at_price = Column(Integer, nullable=True)
    stock = Column(Integer, default=0)
    sku = Column(String(50), nullable=True)
    image_url = Column(String(500), nullable=True)
    _images_json = Column("images", Text, default="[]")  # JSON array of URLs
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=False)
    nursery_id = Column(Integer, ForeignKey("nurseries.id"), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    category = relationship("Category", back_populates="products")
    nursery = relationship("Nursery", back_populates="products")

    @property
    def images(self) -> list[str]:
        try:
            return json.loads(self._images_json or "[]")
        except (json.JSONDecodeError, TypeError):
            return []

    @images.setter
    def images(self, value: list[str]) -> None:
        self._images_json = json.dumps(value)


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    buyer_name = Column(String(200), nullable=False)
    buyer_email = Column(String(200), nullable=False)
    buyer_phone = Column(String(20), nullable=True)
    shipping_address = Column(Text, nullable=True)
    status = Column(String(20), default="pending")  # pending|confirmed|preparing|ready|delivered|cancelled
    total = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    nursery_id = Column(Integer, ForeignKey("nurseries.id"), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    nursery = relationship("Nursery", back_populates="orders")
    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(Integer, nullable=False)
    product_name = Column(String(300), nullable=False)
    product_image_url = Column(String(500), nullable=True)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Integer, nullable=False)
    subtotal = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nursery_id = Column(Integer, ForeignKey("nurseries.id"), nullable=False)
    author_name = Column(String(200), nullable=False)
    rating = Column(Integer, nullable=False)  # 1–5
    comment = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    nursery = relationship("Nursery", back_populates="reviews")


# --- Database engine and session ---

engine = create_engine(
    settings.database_url,
    echo=settings.database_echo,
    connect_args={"check_same_thread": False},  # SQLite specific
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that yields a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables() -> None:
    """Create all tables in the database."""
    Base.metadata.create_all(bind=engine)
