// ============================================================
// api.ts — delegates to mock-api for static / GitHub Pages deployment
//
// To restore real axios-based API calls, swap this file with api.real.ts:
//   cp src/lib/api.real.ts src/lib/api.ts
// ============================================================

export {
  productsApi,
  nurseriesApi,
  categoriesApi,
  ordersApi,
  reviewsApi,
  adminApi,
} from "./mock-api";
