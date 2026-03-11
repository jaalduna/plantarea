import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export function ViveroStats() {
  useEffect(() => {
    document.title = "Estadísticas — Mi Vivero — Plantarea";
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Estadísticas</h1>
      <p className="mt-1 text-muted-foreground">Analiza el rendimiento de tu vivero</p>

      <div className="mt-6">
        <Card>
          <CardContent className="flex flex-col items-center py-16">
            <BarChart3 className="h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium">Estadísticas disponibles pronto</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Aquí podrás ver gráficos de ventas, productos más vendidos,
              visitas a tu perfil y más.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
