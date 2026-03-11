import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Star, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/storefront/ProductCard";
import { useNursery } from "@/hooks/useNurseries";
import { useCart } from "@/hooks/useCart";

export function NurseryProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: nursery, isLoading } = useNursery(Number(id));
  const { addItem } = useCart();

  useEffect(() => {
    if (nursery) {
      document.title = `${nursery.name} — Plantarea`;
    }
  }, [nursery]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-4">
          <div className="h-48 rounded-lg bg-muted" />
          <div className="h-8 w-64 rounded bg-muted" />
          <div className="h-4 w-96 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!nursery) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-lg text-muted-foreground">Vivero no encontrado</p>
        <Link to="/viveros" className="mt-4 inline-block text-primary hover:underline">
          Ver todos los viveros
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link to="/viveros" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Todos los viveros
      </Link>

      {/* Cover + Info */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <div className="h-48 bg-muted sm:h-56">
          {nursery.cover_url ? (
            <img src={nursery.cover_url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/5">
              <Store className="h-16 w-16 text-primary/20" />
            </div>
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">{nursery.name}</h1>
              {nursery.description && (
                <p className="mt-2 max-w-2xl text-muted-foreground">{nursery.description}</p>
              )}
            </div>
            <div className="flex items-center gap-1 text-lg">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">{nursery.rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({nursery.review_count} reseñas)</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {nursery.address && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {nursery.address}, {nursery.city}, {nursery.region}
              </span>
            )}
            {nursery.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {nursery.phone}
              </span>
            )}
            {nursery.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {nursery.email}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Productos ({nursery.products.length})</h2>
        {nursery.products.length > 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {nursery.products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addItem} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">Este vivero aún no tiene productos publicados.</p>
        )}
      </div>

      {/* Reviews */}
      <Separator className="my-8" />
      <div>
        <h2 className="text-xl font-bold">Reseñas ({nursery.reviews.length})</h2>
        {nursery.reviews.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {nursery.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{review.author_name}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  {review.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  )}
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("es-CL")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-muted-foreground">Aún no hay reseñas para este vivero.</p>
        )}
      </div>
    </div>
  );
}
