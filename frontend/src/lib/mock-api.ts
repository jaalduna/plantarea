// ============================================================
// Plantarea Mock API
// Implements the same interface as api.ts but returns data from mock-data.ts
// Used for static / GitHub Pages deployment (no backend required)
// ============================================================

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

import {
  MOCK_CATEGORIES,
  MOCK_NURSERIES,
  MOCK_PRODUCTS,
  MOCK_REVIEWS,
  MOCK_ORDERS,
} from "./mock-data";

// In-memory mutable state (resets on page refresh — acceptable for demo)
let _products: Product[] = [...MOCK_PRODUCTS];
let _nurseries: Nursery[] = [...MOCK_NURSERIES];
let _orders: Order[] = [...MOCK_ORDERS];
let _reviews: Review[] = [...MOCK_REVIEWS];

// Auto-increment helpers
let _nextProductId = _products.length + 1;
let _nextOrderId = _orders.length + 1;
let _nextReviewId = _reviews.length + 1;

/** Simulates async latency so UI loading states are visible */
const delay = (ms = 120) => new Promise<void>((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export const productsApi = {
  list: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    await delay();

    let results = _products.filter((p) => p.is_active);

    if (filters?.category_id) {
      results = results.filter((p) => p.category_id === Number(filters.category_id));
    }

    if (filters?.nursery_id) {
      results = results.filter((p) => p.nursery_id === Number(filters.nursery_id));
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.nursery?.city ?? "").toLowerCase().includes(q) ||
          (p.nursery?.region ?? "").toLowerCase().includes(q)
      );
    }

    if (filters?.price_min !== undefined) {
      results = results.filter((p) => p.price >= Number(filters.price_min));
    }

    if (filters?.price_max !== undefined) {
      results = results.filter((p) => p.price <= Number(filters.price_max));
    }

    if (filters?.location) {
      const loc = filters.location.toLowerCase();
      results = results.filter(
        (p) =>
          (p.nursery?.city ?? "").toLowerCase().includes(loc) ||
          (p.nursery?.region ?? "").toLowerCase().includes(loc)
      );
    }

    const total = results.length;
    const page = filters?.page ?? 1;
    const per_page = filters?.per_page ?? 12;
    const pages = Math.max(1, Math.ceil(total / per_page));
    const start = (page - 1) * per_page;
    const items = results.slice(start, start + per_page);

    return { items, total, page, per_page, pages };
  },

  get: async (id: number): Promise<Product> => {
    await delay();
    const product = _products.find((p) => p.id === id);
    if (!product) throw new Error(`Product ${id} not found`);
    return product;
  },

  create: async (data: ProductCreate): Promise<Product> => {
    await delay();
    const category = MOCK_CATEGORIES.find((c) => c.id === data.category_id) ?? null;
    const nursery = _nurseries.find((n) => n.id === data.nursery_id) ?? null;
    const newProduct: Product = {
      id: _nextProductId++,
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      description: data.description ?? null,
      price: data.price,
      compare_at_price: data.compare_at_price ?? null,
      stock: data.stock,
      sku: data.sku ?? null,
      image_url: data.image_url ?? null,
      images: data.images ?? [],
      category_id: data.category_id,
      nursery_id: data.nursery_id,
      is_active: true,
      created_at: new Date().toISOString(),
      category: category ?? undefined,
      nursery: nursery ?? undefined,
    };
    _products = [..._products, newProduct];
    return newProduct;
  },

  update: async (id: number, data: ProductUpdate): Promise<Product> => {
    await delay();
    const idx = _products.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error(`Product ${id} not found`);
    const updated: Product = { ..._products[idx], ...data };
    _products = _products.map((p) => (p.id === id ? updated : p));
    return updated;
  },

  delete: async (id: number): Promise<void> => {
    await delay();
    _products = _products.filter((p) => p.id !== id);
  },
};

// ---------------------------------------------------------------------------
// Nurseries
// ---------------------------------------------------------------------------
export const nurseriesApi = {
  list: async (): Promise<Nursery[]> => {
    await delay();
    return _nurseries.filter((n) => n.is_active);
  },

  get: async (id: number): Promise<NurseryDetail> => {
    await delay();
    const nursery = _nurseries.find((n) => n.id === id);
    if (!nursery) throw new Error(`Nursery ${id} not found`);
    const products = _products.filter((p) => p.nursery_id === id && p.is_active);
    const reviews = _reviews.filter((r) => r.nursery_id === id);
    return { ...nursery, products, reviews };
  },

  update: async (id: number, data: NurseryUpdate): Promise<Nursery> => {
    await delay();
    const idx = _nurseries.findIndex((n) => n.id === id);
    if (idx === -1) throw new Error(`Nursery ${id} not found`);
    const updated: Nursery = { ..._nurseries[idx], ...data };
    _nurseries = _nurseries.map((n) => (n.id === id ? updated : n));
    return updated;
  },
};

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const categoriesApi = {
  list: async (): Promise<Category[]> => {
    await delay(60);
    // Compute live product counts
    return MOCK_CATEGORIES.map((cat) => ({
      ...cat,
      product_count: _products.filter((p) => p.category_id === cat.id && p.is_active).length,
    }));
  },
};

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------
export const ordersApi = {
  list: async (params?: { nursery_id?: number; status?: string }): Promise<Order[]> => {
    await delay();
    let results = [..._orders];
    if (params?.nursery_id) {
      results = results.filter((o) => o.nursery_id === Number(params.nursery_id));
    }
    if (params?.status) {
      results = results.filter((o) => o.status === params.status);
    }
    return results;
  },

  get: async (id: number): Promise<Order> => {
    await delay();
    const order = _orders.find((o) => o.id === id);
    if (!order) throw new Error(`Order ${id} not found`);
    return order;
  },

  create: async (data: OrderCreate): Promise<Order> => {
    await delay(200);

    // Resolve product info for each item
    const items = data.items.map((item, i) => {
      const product = _products.find((p) => p.id === item.product_id);
      if (!product) throw new Error(`Product ${item.product_id} not found`);
      return {
        id: i + 1,
        product_id: item.product_id,
        product_name: product.name,
        product_image_url: product.image_url,
        quantity: item.quantity,
        unit_price: product.price,
        subtotal: product.price * item.quantity,
      };
    });

    const total = items.reduce((s, i) => s + i.subtotal, 0);

    // Determine nursery from first item
    const firstProduct = _products.find((p) => p.id === data.items[0]?.product_id);
    const nursery = firstProduct ? _nurseries.find((n) => n.id === firstProduct.nursery_id) : undefined;

    const newOrder: Order = {
      id: _nextOrderId++,
      buyer_name: data.buyer_name,
      buyer_email: data.buyer_email,
      buyer_phone: data.buyer_phone ?? null,
      shipping_address: data.shipping_address ?? null,
      status: "pending",
      total,
      notes: data.notes ?? null,
      nursery_id: nursery?.id ?? 0,
      nursery_name: nursery?.name,
      items,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    _orders = [..._orders, newOrder];
    return newOrder;
  },

  updateStatus: async (id: number, data: OrderStatusUpdate): Promise<Order> => {
    await delay();
    const idx = _orders.findIndex((o) => o.id === id);
    if (idx === -1) throw new Error(`Order ${id} not found`);
    const updated: Order = { ..._orders[idx], status: data.status, updated_at: new Date().toISOString() };
    _orders = _orders.map((o) => (o.id === id ? updated : o));
    return updated;
  },
};

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------
export const reviewsApi = {
  list: async (nurseryId: number): Promise<Review[]> => {
    await delay();
    return _reviews.filter((r) => r.nursery_id === nurseryId);
  },

  create: async (nurseryId: number, data: ReviewCreate): Promise<Review> => {
    await delay(150);
    const newReview: Review = {
      id: _nextReviewId++,
      nursery_id: nurseryId,
      author_name: data.author_name,
      rating: data.rating,
      comment: data.comment ?? null,
      created_at: new Date().toISOString(),
    };
    _reviews = [..._reviews, newReview];
    return newReview;
  },
};

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------
export const adminApi = {
  metrics: async (): Promise<AdminMetrics> => {
    await delay();

    const total_revenue = _orders.reduce((s, o) => s + o.total, 0);
    const orders_by_status = _orders.reduce(
      (acc, o) => {
        acc[o.status] = (acc[o.status] ?? 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    ) as AdminMetrics["orders_by_status"];

    const nurseryRevenue: Record<number, { nursery: Nursery; order_count: number; revenue: number }> = {};
    for (const o of _orders) {
      const nursery = _nurseries.find((n) => n.id === o.nursery_id);
      if (!nursery) continue;
      if (!nurseryRevenue[o.nursery_id]) {
        nurseryRevenue[o.nursery_id] = { nursery, order_count: 0, revenue: 0 };
      }
      nurseryRevenue[o.nursery_id].order_count += 1;
      nurseryRevenue[o.nursery_id].revenue += o.total;
    }

    const top_nurseries = Object.values(nurseryRevenue).sort((a, b) => b.revenue - a.revenue);

    return {
      total_products: _products.filter((p) => p.is_active).length,
      total_nurseries: _nurseries.filter((n) => n.is_active).length,
      total_orders: _orders.length,
      total_revenue,
      orders_by_status,
      top_nurseries,
    };
  },

  nurseries: async (): Promise<Nursery[]> => {
    await delay();
    return [..._nurseries];
  },
};
