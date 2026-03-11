import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";

export function Cart() {
  useEffect(() => {
    document.title = "Carrito — Plantarea";
  }, []);

  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
        <h1 className="mt-4 text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">Agrega plantas y flores para comenzar</p>
        <Link to="/catalogo" className="mt-6 inline-block">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ir al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Carrito ({itemCount})</h1>
        <Button variant="ghost" size="sm" onClick={clearCart}>
          Vaciar carrito
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="flex gap-4 p-4">
                {/* Image */}
                <Link to={`/producto/${item.product.id}`} className="shrink-0">
                  <div className="h-20 w-20 overflow-hidden rounded-md bg-muted">
                    {item.product.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        Sin img
                      </div>
                    )}
                  </div>
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col">
                  <Link
                    to={`/producto/${item.product.id}`}
                    className="font-medium hover:text-primary"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.product.nursery?.name}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex items-center rounded-lg border border-border">
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-bold">Resumen del pedido</h2>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="text-primary">Por calcular</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button className="mt-6 w-full" size="lg">
                Ir al checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
