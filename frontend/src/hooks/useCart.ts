import { useState, useCallback } from "react";
import type { Product, CartItem } from "@/types";

const CART_KEY = "plantarea_cart";

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        next = [...prev, { product, quantity }];
      }
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((item) => item.product.id !== productId)
          : prev.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            );
      saveCart(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Group items by nursery for multi-nursery checkout
  const itemsByNursery = items.reduce<Record<number, CartItem[]>>((acc, item) => {
    const nurseryId = item.product.nursery_id;
    if (!acc[nurseryId]) acc[nurseryId] = [];
    acc[nurseryId].push(item);
    return acc;
  }, {});

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
    itemsByNursery,
  };
}
