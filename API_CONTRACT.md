# Plantarea API Contract

Base URL: `/api`

---

## Products

### GET /api/products
List products with optional filters.

**Query Parameters:**
| Parameter   | Type   | Default | Description                        |
|-------------|--------|---------|------------------------------------|
| category_id | int    | -       | Filter by category                 |
| nursery_id  | int    | -       | Filter by nursery                  |
| search      | string | -       | Search in product name (ILIKE)     |
| price_min   | int    | -       | Minimum price in CLP               |
| price_max   | int    | -       | Maximum price in CLP               |
| location    | string | -       | Filter by nursery city             |
| page        | int    | 1       | Page number                        |
| per_page    | int    | 20      | Items per page (max 100)           |

**Response:** `PaginatedResponse<Product>`
```json
{
  "items": [{ "id": 1, "name": "Araucaria chilena", "price": 25000, ... }],
  "total": 29,
  "page": 1,
  "per_page": 20,
  "pages": 2
}
```

### GET /api/products/{id}
Get a single product with category and nursery details.

**Response:** `Product` (with nested `category` and `nursery`)

### POST /api/products
Create a new product (nursery auth required in future).

**Body:** `ProductCreate`
```json
{
  "name": "Lavanda inglesa",
  "description": "Lavandula angustifolia...",
  "price": 4000,
  "stock": 35,
  "category_id": 6,
  "nursery_id": 5
}
```
**Response:** `201 Product`

### PUT /api/products/{id}
Update an existing product. Only sends changed fields.

**Body:** `ProductUpdate` (partial)
**Response:** `Product`

### DELETE /api/products/{id}
Delete a product.

**Response:** `204 No Content`

---

## Nurseries

### GET /api/nurseries
List all active nurseries, sorted by rating descending.

**Response:** `Nursery[]`

### GET /api/nurseries/{id}
Get nursery detail including products and reviews.

**Response:** `NurseryDetail` (with nested `products[]` and `reviews[]`)

### PUT /api/nurseries/{id}
Update nursery profile.

**Body:** `NurseryUpdate` (partial)
**Response:** `Nursery`

---

## Reviews

### GET /api/nurseries/{id}/reviews
List reviews for a nursery, newest first.

**Response:** `Review[]`

### POST /api/nurseries/{id}/reviews
Create a new review. Automatically updates nursery rating and review_count.

**Body:**
```json
{
  "author_name": "Maria Gonzalez",
  "rating": 5,
  "comment": "Excelentes plantas"
}
```
**Response:** `201 Review`

---

## Categories

### GET /api/categories
List all categories with product counts.

**Response:** `Category[]`
```json
[
  { "id": 1, "name": "Arboles nativos", "slug": "arboles-nativos", "icon": "🌳", "product_count": 6 }
]
```

---

## Orders

### POST /api/orders
Create one or more orders. Items from different nurseries create separate orders automatically.

**Body:** `OrderCreate`
```json
{
  "buyer_name": "Juan Perez",
  "buyer_email": "juan@email.com",
  "buyer_phone": "+56 9 1234 5678",
  "shipping_address": "Av. Providencia 1234, Santiago",
  "items": [
    { "product_id": 1, "quantity": 2 },
    { "product_id": 11, "quantity": 1 }
  ]
}
```
**Response:** `201 Order`

### GET /api/orders
List orders with optional filters.

**Query Parameters:**
| Parameter  | Type   | Description            |
|------------|--------|------------------------|
| nursery_id | int    | Filter by nursery      |
| status     | string | Filter by order status |

**Response:** `Order[]`

### GET /api/orders/{id}
Get order detail with items.

**Response:** `Order` (with nested `items[]`)

### PUT /api/orders/{id}/status
Update order status.

**Body:**
```json
{ "status": "confirmed" }
```

**Allowed statuses:** `pending`, `confirmed`, `preparing`, `ready`, `delivered`, `cancelled`

**Response:** `Order`

---

## Admin

### GET /api/admin/metrics
Get platform-wide business metrics.

**Response:**
```json
{
  "total_products": 29,
  "total_nurseries": 6,
  "total_orders": 12,
  "total_revenue": 456000,
  "orders_by_status": { "pending": 3, "confirmed": 5, "delivered": 4 },
  "top_nurseries": [
    { "nursery": { ... }, "order_count": 5, "revenue": 180000 }
  ]
}
```

### GET /api/admin/nurseries
List all nurseries (including inactive) for admin management.

**Response:** `Nursery[]`

---

## Health Check

### GET /health
**Response:** `{ "status": "ok", "service": "plantarea" }`

---

## Common Types

### Product
```typescript
{
  id: number
  name: string
  slug: string
  description: string | null
  price: number          // CLP integer
  compare_at_price: number | null
  stock: number
  sku: string | null
  image_url: string | null
  images: string[]
  category_id: number
  nursery_id: number
  is_active: boolean
  created_at: string     // ISO 8601
  category?: Category
  nursery?: Nursery
}
```

### Order Status Flow
```
pending -> confirmed -> preparing -> ready -> delivered
                                          \-> cancelled
```
