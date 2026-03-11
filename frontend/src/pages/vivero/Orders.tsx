import { useEffect } from "react";
import { ClipboardList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  preparing: "Preparando",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

const statusColors: Record<OrderStatus, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  confirmed: "default",
  preparing: "default",
  ready: "default",
  delivered: "secondary",
  cancelled: "destructive",
};

export function ViveroOrders() {
  useEffect(() => {
    document.title = "Pedidos — Mi Vivero — Plantarea";
  }, []);

  // In real app: nursery_id from auth context
  const { data: orders, isLoading } = useOrders({ nursery_id: 1 });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(price);

  return (
    <div>
      <h1 className="text-2xl font-bold">Pedidos</h1>
      <p className="mt-1 text-muted-foreground">Gestiona los pedidos de tu vivero</p>


      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : !orders || orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-12">
              <ClipboardList className="h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-lg font-medium">Sin pedidos</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Los pedidos de tus clientes aparecerán aquí
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pedido #{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.buyer_name}</p>
                    </div>
                    <Badge variant={statusColors[order.status]}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {order.items.length} producto{order.items.length !== 1 && "s"}
                    </span>
                    <span className="font-medium">{formatPrice(order.total)}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("es-CL", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
