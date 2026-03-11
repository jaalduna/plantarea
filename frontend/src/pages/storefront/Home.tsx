import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/storefront/ProductCard";
import { NurseryCard } from "@/components/storefront/NurseryCard";
import { useProducts } from "@/hooks/useProducts";
import { useNurseries } from "@/hooks/useNurseries";
import { useCart } from "@/hooks/useCart";

export function Home() {
  useEffect(() => {
    document.title = "Plantarea — Plantas y flores de viveros de Chile";
  }, []);
  const { data: productsData } = useProducts({ per_page: 8 });
  const { data: nurseries } = useNurseries();
  const { addItem } = useCart();

  const products = productsData?.items ?? [];
  const featuredNurseries = nurseries?.slice(0, 4) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Plantas y flores de{" "}
            <span className="text-primary">viveros locales</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Descubre la mejor selección de plantas, árboles y flores de viveros de Chile.
            Directo del productor a tu jardín.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/catalogo">
              <Button size="lg">
                Ver catálogo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/viveros">
              <Button variant="outline" size="lg">
                Explorar viveros
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border bg-muted/30 py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Leaf className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Directo del vivero</p>
              <p className="text-xs text-muted-foreground">Plantas frescas y saludables</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Truck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Envío a todo Chile</p>
              <p className="text-xs text-muted-foreground">Despacho seguro y cuidadoso</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Compra segura</p>
              <p className="text-xs text-muted-foreground">Pago protegido y garantizado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Productos destacados</h2>
            <Link to="/catalogo" className="text-sm font-medium text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Nurseries */}
      <section className="bg-muted/30 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Viveros destacados</h2>
            <Link to="/viveros" className="text-sm font-medium text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredNurseries.map((nursery) => (
              <NurseryCard key={nursery.id} nursery={nursery} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
