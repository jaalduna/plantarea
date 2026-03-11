"""Pydantic schemas for API request/response models."""

from datetime import datetime
from enum import Enum
from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict, Field


# ============================================================
# Category
# ============================================================

class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None = None
    icon: str | None = None
    product_count: int = 0


# ============================================================
# Nursery
# ============================================================

class NurseryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None = None
    address: str | None = None
    city: str | None = None
    region: str | None = None
    phone: str | None = None
    email: str | None = None
    logo_url: str | None = None
    cover_url: str | None = None
    rating: float = 0.0
    review_count: int = 0
    is_active: bool = True
    created_at: datetime


class NurseryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    address: str | None = None
    city: str | None = None
    region: str | None = None
    phone: str | None = None
    email: str | None = None
    is_active: bool | None = None


# ============================================================
# Product
# ============================================================

class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None = None
    price: int
    compare_at_price: int | None = None
    stock: int = 0
    sku: str | None = None
    image_url: str | None = None
    images: list[str] = Field(default_factory=list)
    category_id: int
    nursery_id: int
    is_active: bool = True
    created_at: datetime
    category: CategoryOut | None = None
    nursery: NurseryOut | None = None


class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: int = Field(gt=0)
    compare_at_price: int | None = None
    stock: int = Field(ge=0, default=0)
    sku: str | None = None
    image_url: str | None = None
    images: list[str] = Field(default_factory=list)
    category_id: int
    nursery_id: int


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: int | None = Field(default=None, gt=0)
    compare_at_price: int | None = None
    stock: int | None = Field(default=None, ge=0)
    sku: str | None = None
    image_url: str | None = None
    images: list[str] | None = None
    category_id: int | None = None
    is_active: bool | None = None


# ============================================================
# Order
# ============================================================

class OrderStatus(str, Enum):
    pending = "pending"
    confirmed = "confirmed"
    preparing = "preparing"
    ready = "ready"
    delivered = "delivered"
    cancelled = "cancelled"


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    product_name: str
    product_image_url: str | None = None
    quantity: int
    unit_price: int
    subtotal: int


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    buyer_name: str
    buyer_email: str
    buyer_phone: str | None = None
    shipping_address: str | None = None
    status: str
    total: int
    notes: str | None = None
    nursery_id: int
    items: list[OrderItemOut] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime


class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    buyer_name: str
    buyer_email: str
    buyer_phone: str | None = None
    shipping_address: str | None = None
    notes: str | None = None
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderStatusUpdate(BaseModel):
    status: OrderStatus


# ============================================================
# Review
# ============================================================

class ReviewOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nursery_id: int
    author_name: str
    rating: int
    comment: str | None = None
    created_at: datetime


class ReviewCreate(BaseModel):
    author_name: str
    rating: int = Field(ge=1, le=5)
    comment: str | None = None


# ============================================================
# Admin
# ============================================================

class AdminMetrics(BaseModel):
    total_products: int
    total_nurseries: int
    total_orders: int
    total_revenue: int
    orders_by_status: dict[str, int]
    top_nurseries: list[dict]


# ============================================================
# Pagination
# ============================================================

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    per_page: int
    pages: int
