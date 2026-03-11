import { useEffect } from "react";
import { Package, Store, ClipboardList, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Dashboard — Plantarea";
  }, []);

  // In a real app: fetch from /api/admin/metrics
  const stats = [
    { label: "Productos totales", value: "156", icon: Package, color: "text-primary" },
    { label: "Viveros activos", value: "12", icon: Store, color: "text-primary" },
    { label: "Pedidos totales", value: "48", icon: ClipboardList, color: "text-destructive" },
    { label: "Ingresos totales", value: "$2.340.000", icon: DollarSign, color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Métricas generales de Plantarea</p>

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
    </div>
  );
}
