import { create } from 'zustand';

const CART_STORAGE_KEY = 'naksha_boutique_cart_v1';
const FREE_SHIPPING_THRESHOLD = 999;

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load cart from localStorage', e);
    return [];
  }
};

export const useCartStore = create((set, get) => ({
  items: getInitialCart(),
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, { selectedSize, selectedCup = null, selectedColor }) => {
    set((state) => {
      // Create a unique composite key for item variation
      const cartItemId = `${product.id}-${selectedSize}-${selectedCup || 'none'}-${selectedColor?.name || 'default'}`;

      const existingIndex = state.items.findIndex((item) => item.cartItemId === cartItemId);
      let updatedItems;

      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newItem = {
          cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          originalPrice: product.originalPrice,
          category: product.category,
          image: product.images[0],
          selectedSize,
          selectedCup,
          selectedColor: selectedColor?.name || 'Default',
          colorHex: selectedColor?.hex || '#C06C64',
          quantity: 1,
        };
        updatedItems = [newItem, ...state.items];
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedItems));
      return { items: updatedItems, isOpen: true };
    });
  },

  removeItem: (cartItemId) => {
    set((state) => {
      const updated = state.items.filter((item) => item.cartItemId !== cartItemId);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      return { items: updated };
    });
  },

  updateQuantity: (cartItemId, newQty) => {
    set((state) => {
      if (newQty <= 0) {
        const updated = state.items.filter((item) => item.cartItemId !== cartItemId);
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
        return { items: updated };
      }

      const updated = state.items.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      );
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
      return { items: updated };
    });
  },

  clearCart: () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    set({ items: [] });
  },

  getSubtotal: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getTotalSavings: () => {
    const items = get().items;
    return items.reduce((sum, item) => {
      const orig = item.originalPrice || item.price;
      return sum + (orig - item.price) * item.quantity;
    }, 0);
  },

  getItemCount: () => {
    const items = get().items;
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  getFreeShippingProgress: () => {
    const subtotal = get().getSubtotal();
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
    const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    return {
      threshold: FREE_SHIPPING_THRESHOLD,
      subtotal,
      remaining,
      percentage,
      isQualified: subtotal >= FREE_SHIPPING_THRESHOLD,
    };
  },
}));
