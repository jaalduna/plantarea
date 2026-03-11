import { Link } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.compare_at_price!) * 100)
    : 0;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      {/* Image */}
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Leaf className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          {hasDiscount && (
            <Badge className="absolute top-2 left-2" variant="destructive">
              -{discountPercent}%
            </Badge>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary">Agotado</Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-3">
        <Link to={`/producto/${product.id}`}>
          <h3 className="line-clamp-2 text-sm font-medium leading-tight hover:text-primary">
            {product.name}
          </h3>
        </Link>
        {product.nursery && (
          <p className="mt-1 text-xs text-muted-foreground">{product.nursery.name}</p>
        )}

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compare_at_price!)}
              </span>
            )}
          </div>
          {onAddToCart && product.stock > 0 && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
