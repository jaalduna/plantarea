// ============================================================
// Plantarea TypeScript Types
// Matches backend Pydantic schemas
// ============================================================

// --- Category ---
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  product_count?: number;
}

// --- Nursery (Vivero) ---
export interface Nursery {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  region: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  cover_url: string | null;
  rating: number;
  review_count: number;
  is_active: boolean;
  created_at: string;
}

export interface NurseryDetail extends Nursery {
  products: Product[];
  reviews: Review[];
}

export interface NurseryCreate {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string;
}

export interface NurseryUpdate {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  region?: string;
  phone?: string;
  email?: string;
  is_active?: boolean;
}

// --- Product ---
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  sku: string | null;
  image_url: string | null;
  images: string[];
  category_id: number;
  nursery_id: number;
  is_active: boolean;
  created_at: string;
  category?: Category;
  nursery?: Nursery;
}

export interface ProductCreate {
  name: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  stock: number;
  sku?: string;
  image_url?: string;
  images?: string[];
  category_id: number;
  nursery_id: number;
}

export interface ProductUpdate {
  name?: string;
  description?: string;
  price?: number;
  compare_at_price?: number;
  stock?: number;
  sku?: string;
  image_url?: string;
  images?: string[];
  category_id?: number;
  is_active?: boolean;
}

export interface ProductFilters {
  category_id?: number;
  nursery_id?: number;
  search?: string;
  price_min?: number;
  price_max?: number;
  location?: string;
  page?: number;
  per_page?: number;
}

// --- Order ---
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  product_image_url: string | null;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string | null;
  shipping_address: string | null;
  status: OrderStatus;
  total: number;
  notes: string | null;
  nursery_id: number;
  nursery_name?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderCreate {
  buyer_name: string;
  buyer_email: string;
  buyer_phone?: string;
  shipping_address?: string;
  notes?: string;
  items: OrderItemCreate[];
}

export interface OrderItemCreate {
  product_id: number;
  quantity: number;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
}

// --- Review ---
export interface Review {
  id: number;
  nursery_id: number;
  author_name: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface ReviewCreate {
  author_name: string;
  rating: number;
  comment?: string;
}

// --- Cart (client-side) ---
export interface CartItem {
  product: Product;
  quantity: number;
}

// --- Admin Metrics ---
export interface AdminMetrics {
  total_products: number;
  total_nurseries: number;
  total_orders: number;
  total_revenue: number;
  orders_by_status: Record<OrderStatus, number>;
  top_nurseries: Array<{ nursery: Nursery; order_count: number; revenue: number }>;
}

// --- Pagination ---
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}
