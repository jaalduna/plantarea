import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/storefront/ProductCard";
import { CategoryFilter } from "@/components/storefront/CategoryFilter";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useCart } from "@/hooks/useCart";
import type { ProductFilters } from "@/types";

export function Catalog() {
  useEffect(() => {
    document.title = "Catálogo — Plantarea";
  }, []);

  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchInput, setSearchInput] = useState("");
  const { data: productsData, isLoading } = useProducts(filters);
  const { data: categories } = useCategories();
  const { addItem } = useCart();

  const products = productsData?.items ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput || undefined, page: 1 }));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Catálogo</h1>
      <p className="mt-1 text-muted-foreground">
        Encuentra la planta perfecta para tu jardín
      </p>

      {/* Search */}
      <form onSubmit={handleSearch} className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar plantas, arboles, flores..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10"
          />
        </div>
      </form>

      {/* Category filters */}
      {categories && categories.length > 0 && (
        <div className="mt-4">
          <CategoryFilter
            categories={categories}
            selectedId={filters.category_id}
            onSelect={(id) => setFilters((prev) => ({ ...prev, category_id: id, page: 1 }))}
          />
        </div>
      )}

      {/* Products grid */}
      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg font-medium text-muted-foreground">
              No se encontraron productos
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta con otros filtros o términos de búsqueda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {productsData && productsData.pages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: productsData.pages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setFilters((prev) => ({ ...prev, page }))}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                (filters.page ?? 1) === page
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
