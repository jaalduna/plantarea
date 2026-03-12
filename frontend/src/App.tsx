import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layouts
import { StorefrontLayout } from "@/components/layout/StorefrontLayout";
import { ViveroLayout } from "@/components/layout/ViveroLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

// Storefront pages
import { Home } from "@/pages/storefront/Home";
import { Catalog } from "@/pages/storefront/Catalog";
import { ProductDetail } from "@/pages/storefront/ProductDetail";
import { NurseriesList } from "@/pages/storefront/NurseriesList";
import { NurseryProfile } from "@/pages/storefront/NurseryProfile";
import { Cart } from "@/pages/storefront/Cart";

// Vivero panel pages
import { ViveroHome } from "@/pages/vivero/Dashboard";
import { ViveroProducts } from "@/pages/vivero/Products";
import { ViveroOrders } from "@/pages/vivero/Orders";
import { ViveroStats } from "@/pages/vivero/Stats";

// Admin panel pages
import { AdminDashboard } from "@/pages/admin/Dashboard";
import { AdminNurseries } from "@/pages/admin/Nurseries";
import { AdminModeration } from "@/pages/admin/Moderation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Storefront */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/viveros" element={<NurseriesList />} />
            <Route path="/viveros/:id" element={<NurseryProfile />} />
            <Route path="/carrito" element={<Cart />} />
          </Route>

          {/* Vivero Panel */}
          <Route element={<ViveroLayout />}>
            <Route path="/vivero" element={<ViveroHome />} />
            <Route path="/vivero/productos" element={<ViveroProducts />} />
            <Route path="/vivero/pedidos" element={<ViveroOrders />} />
            <Route path="/vivero/estadisticas" element={<ViveroStats />} />
          </Route>

          {/* Admin Panel */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/viveros" element={<AdminNurseries />} />
            <Route path="/admin/moderacion" element={<AdminModeration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
