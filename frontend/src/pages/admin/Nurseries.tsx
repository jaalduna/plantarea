import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";
import { useNurseries } from "@/hooks/useNurseries";

export function AdminNurseries() {
  useEffect(() => {
    document.title = "Viveros — Admin — Plantarea";
  }, []);

  const { data: nurseries, isLoading } = useNurseries();

  return (
    <div>
      <h1 className="text-2xl font-bold">Viveros</h1>
      <p className="mt-1 text-muted-foreground">Administra todos los viveros de la plataforma</p>

      <div className="mt-6 space-y-3">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-lg bg-muted" />
          ))
        ) : (
          nurseries?.map((nursery) => (
            <Card key={nursery.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{nursery.name}</p>
                    <Badge variant={nursery.is_active ? "default" : "secondary"}>
                      {nursery.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    {nursery.city && (
                      <span className="flex items-center gap-0.5">
                        <MapPin className="h-3 w-3" />
                        {nursery.city}
                      </span>
                    )}
                    <span className="flex items-center gap-0.5">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {nursery.rating.toFixed(1)} ({nursery.review_count})
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Gestionar
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
