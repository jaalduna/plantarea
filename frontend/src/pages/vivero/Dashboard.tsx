import { useEffect } from "react";
import { Package, ClipboardList, DollarSign, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ViveroHome() {
  useEffect(() => {
    document.title = "Dashboard — Mi Vivero — Plantarea";
  }, []);

  // In a real app, this would come from auth context + API
  const stats = [
    { label: "Productos activos", value: "24", icon: Package, color: "text-primary" },
    { label: "Pedidos pendientes", value: "3", icon: ClipboardList, color: "text-destructive" },
    { label: "Ventas del mes", value: "$456.000", icon: DollarSign, color: "text-primary" },
    { label: "Calificación", value: "4.7", icon: Star, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Resumen de tu vivero</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`rounded-lg bg-muted p-2.5 ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Pedidos recientes</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Los pedidos recientes aparecerán aquí una vez que empieces a recibir compras.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
