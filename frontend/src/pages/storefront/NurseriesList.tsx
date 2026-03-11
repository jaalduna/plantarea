import { useEffect } from "react";
import { NurseryCard } from "@/components/storefront/NurseryCard";
import { useNurseries } from "@/hooks/useNurseries";

export function NurseriesList() {
  useEffect(() => {
    document.title = "Viveros — Plantarea";
  }, []);

  const { data: nurseries, isLoading } = useNurseries();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Viveros</h1>
      <p className="mt-1 text-muted-foreground">
        Conoce a los productores detras de cada planta
      </p>

      <div className="mt-8">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        ) : nurseries && nurseries.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nurseries.map((nursery) => (
              <NurseryCard key={nursery.id} nursery={nursery} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-muted-foreground">
            No hay viveros registrados aún.
          </p>
        )}
      </div>
    </div>
  );
}
