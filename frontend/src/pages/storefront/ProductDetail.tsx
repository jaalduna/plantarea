import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Minus, Plus, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(Number(id));
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Plantarea`;
    }
  }, [product]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="aspect-square rounded-lg bg-muted" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-24 rounded bg-muted" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">Producto no encontrado</p>
        <Link to="/catalogo" className="mt-4 inline-block text-primary hover:underline">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link to="/catalogo" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <Badge variant="secondary">{product.category.name}</Badge>
          )}
          <h1 className="mt-2 text-3xl font-bold">{product.name}</h1>

          {product.nursery && (
            <Link
              to={`/viveros/${product.nursery.id}`}
              className="mt-2 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5" />
              {product.nursery.name}
              {product.nursery.city && ` - ${product.nursery.city}`}
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {product.nursery.rating.toFixed(1)}
              </span>
            </Link>
          )}

          <Separator className="my-4" />

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>

          {/* Stock */}
          <p className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0
              ? `${product.stock} unidades disponibles`
              : "Producto agotado"}
          </p>

          {/* Description */}
          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <Separator className="my-4" />

          {/* Quantity + Add to cart */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-border">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product, quantity)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Agregar al carrito
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
