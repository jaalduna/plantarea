import { useState, useEffect } from "react";
import { Plus, Search, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts } from "@/hooks/useProducts";

export function ViveroProducts() {
  useEffect(() => {
    document.title = "Mis Productos — Plantarea";
  }, []);

  const [search, setSearch] = useState("");
  // In real app: nursery_id from auth context
  const { data: productsData, isLoading } = useProducts({ nursery_id: 1, search: search || undefined });
  const products = productsData?.items ?? [];

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Productos</h1>
          <p className="mt-1 text-muted-foreground">Administra tu catálogo de productos</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo producto
        </Button>
      </div>

      {/* Search */}
      <div className="relative mt-6 max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products table/list */}
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium">Sin productos</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega tu primer producto para empezar a vender
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo producto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                    {product.image_url ? (
                      <img src={product.image_url} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(product.price)} - Stock: {product.stock}
                    </p>
                  </div>
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Activo" : "Inactivo"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
