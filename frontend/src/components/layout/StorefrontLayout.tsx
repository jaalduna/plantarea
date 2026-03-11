import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useCart } from "@/hooks/useCart";

export function StorefrontLayout() {
  const { itemCount } = useCart();

  return (
    <div className="flex min-h-screen flex-col">
      <Header cartItemCount={itemCount} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
