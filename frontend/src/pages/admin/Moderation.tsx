import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";

export function AdminModeration() {
  useEffect(() => {
    document.title = "Moderación — Admin — Plantarea";
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Moderación</h1>
      <p className="mt-1 text-muted-foreground">Revisa contenido reportado</p>

      <div className="mt-6">
        <Card>
          <CardContent className="flex flex-col items-center py-16">
            <Flag className="h-12 w-12 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-medium">Sin reportes pendientes</p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Los reportes de contenido inapropiado aparecerán aquí.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
