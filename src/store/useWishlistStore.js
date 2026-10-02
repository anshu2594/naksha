import { create } from 'zustand';

const WISHLIST_STORAGE_KEY = 'naksha_boutique_wishlist_v1';

const getInitialWishlist = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Failed to load wishlist from localStorage', e);
    return [];
  }
};

export const useWishlistStore = create((set, get) => ({
  wishlist: getInitialWishlist(),

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.some((item) => item.id === product.id);
      let updated;
      if (exists) {
        updated = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        updated = [product, ...state.wishlist];
      }
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updated));
      return { wishlist: updated };
    });
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.id === productId);
  },

  clearWishlist: () => {
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    set({ wishlist: [] });
  },

  getCount: () => {
    return get().wishlist.length;
  }
}));
