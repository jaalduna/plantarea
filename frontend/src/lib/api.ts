// In production builds (GitHub Pages): use mock data, no backend needed.
// In development (local): use real axios API proxied to FastAPI backend.

import * as real from "./api.real";
import * as mock from "./mock-api";

const impl = import.meta.env.PROD ? mock : real;

export const productsApi = impl.productsApi;
export const nurseriesApi = impl.nurseriesApi;
export const categoriesApi = impl.categoriesApi;
export const ordersApi = impl.ordersApi;
export const reviewsApi = impl.reviewsApi;
export const adminApi = impl.adminApi;
