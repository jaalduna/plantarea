import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Leaf, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  cartItemCount: number;
}

export function Header({ cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Leaf className="h-6 w-6" />
          <span>Plantarea</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors",
              isActive("/")
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Inicio
          </Link>
          <Link
            to="/catalogo"
            className={cn(
              "text-sm font-medium transition-colors",
              isActive("/catalogo")
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Catálogo
          </Link>
          <Link
            to="/viveros"
            className={cn(
              "text-sm font-medium transition-colors",
              isActive("/viveros")
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Viveros
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link to="/carrito">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="border-t border-border px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className={cn(
                "text-sm font-medium",
                isActive("/")
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/catalogo"
              className={cn(
                "text-sm font-medium",
                isActive("/catalogo")
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              to="/viveros"
              className={cn(
                "text-sm font-medium",
                isActive("/viveros")
                  ? "text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Viveros
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
