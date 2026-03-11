import { Link } from "react-router-dom";
import { Star, MapPin, Store } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Nursery } from "@/types";

interface NurseryCardProps {
  nursery: Nursery;
}

export function NurseryCard({ nursery }: NurseryCardProps) {
  return (
    <Link to={`/viveros/${nursery.id}`}>
      <Card className="group overflow-hidden transition-shadow hover:shadow-md">
        {/* Cover */}
        <div className="relative h-32 bg-muted">
          {nursery.cover_url ? (
            <img
              src={nursery.cover_url}
              alt={nursery.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/5">
              <Store className="h-10 w-10 text-primary/30" />
            </div>
          )}
          {/* Logo overlay */}
          <div className="absolute -bottom-6 left-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-background bg-primary/10">
              {nursery.logo_url ? (
                <img
                  src={nursery.logo_url}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <Store className="h-5 w-5 text-primary" />
              )}
            </div>
          </div>
        </div>

        <CardContent className="pt-8 pb-4 px-4">
          <h3 className="font-semibold group-hover:text-primary transition-colors">
            {nursery.name}
          </h3>
          {nursery.description && (
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {nursery.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            {nursery.city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {nursery.city}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {nursery.rating.toFixed(1)} ({nursery.review_count})
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
