import { Outlet, Link, useLocation } from "react-router-dom";
import { Leaf, LayoutDashboard, Package, ClipboardList, BarChart3, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/vivero", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vivero/productos", label: "Productos", icon: Package },
  { to: "/vivero/pedidos", label: "Pedidos", icon: ClipboardList },
  { to: "/vivero/estadisticas", label: "Estadísticas", icon: BarChart3 },
];

export function ViveroLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-64 border-r border-border bg-sidebar lg:block">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Leaf className="h-5 w-5 text-sidebar-primary" />
          <span className="text-lg font-bold text-sidebar-foreground">Panel Vivero</span>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-sidebar-border p-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-sidebar-foreground/60 hover:text-sidebar-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-background px-4 lg:hidden">
          <Leaf className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold">Panel Vivero</span>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-border bg-muted/50 px-2 py-2 lg:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
