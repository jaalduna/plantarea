import axios from "axios";
import type {
  Product,
  ProductCreate,
  ProductUpdate,
  ProductFilters,
  Nursery,
  NurseryDetail,
  NurseryUpdate,
  Category,
  Order,
  OrderCreate,
  OrderStatusUpdate,
  Review,
  ReviewCreate,
  AdminMetrics,
  PaginatedResponse,
} from "@/types";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// --- Products ---
export const productsApi = {
  list: (filters?: ProductFilters) =>
    api.get<PaginatedResponse<Product>>("/products", { params: filters }).then((r) => r.data),

  get: (id: number) =>
    api.get<Product>(`/products/${id}`).then((r) => r.data),

  create: (data: ProductCreate) =>
    api.post<Product>("/products", data).then((r) => r.data),

  update: (id: number, data: ProductUpdate) =>
    api.put<Product>(`/products/${id}`, data).then((r) => r.data),

  delete: (id: number) =>
    api.delete(`/products/${id}`).then((r) => r.data),
};

// --- Nurseries ---
export const nurseriesApi = {
  list: () =>
    api.get<Nursery[]>("/nurseries").then((r) => r.data),

  get: (id: number) =>
    api.get<NurseryDetail>(`/nurseries/${id}`).then((r) => r.data),

  update: (id: number, data: NurseryUpdate) =>
    api.put<Nursery>(`/nurseries/${id}`, data).then((r) => r.data),
};

// --- Categories ---
export const categoriesApi = {
  list: () =>
    api.get<Category[]>("/categories").then((r) => r.data),
};

// --- Orders ---
export const ordersApi = {
  list: (params?: { nursery_id?: number; status?: string }) =>
    api.get<Order[]>("/orders", { params }).then((r) => r.data),

  get: (id: number) =>
    api.get<Order>(`/orders/${id}`).then((r) => r.data),

  create: (data: OrderCreate) =>
    api.post<Order>("/orders", data).then((r) => r.data),

  updateStatus: (id: number, data: OrderStatusUpdate) =>
    api.put<Order>(`/orders/${id}/status`, data).then((r) => r.data),
};

// --- Reviews ---
export const reviewsApi = {
  list: (nurseryId: number) =>
    api.get<Review[]>(`/nurseries/${nurseryId}/reviews`).then((r) => r.data),

  create: (nurseryId: number, data: ReviewCreate) =>
    api.post<Review>(`/nurseries/${nurseryId}/reviews`, data).then((r) => r.data),
};

// --- Admin ---
export const adminApi = {
  metrics: () =>
    api.get<AdminMetrics>("/admin/metrics").then((r) => r.data),

  nurseries: () =>
    api.get<Nursery[]>("/admin/nurseries").then((r) => r.data),
};

export default api;
