import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductFilters } from '../features/products/ProductFilters';
import { ProductGrid } from '../features/products/ProductGrid';
import { SortDropdown } from '../features/products/SortDropdown';
import { BraSizeCalculatorModal } from '../features/size-guide/BraSizeCalculatorModal';
import { PRODUCTS } from '../data/productsData';
import { useFilterStore } from '../store/useFilterStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { Ruler, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '../components/common/Button';

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  const {
    category,
    selectedSizes,
    selectedCups,
    selectedPadding,
    selectedWire,
    sortBy,
    searchQuery,
    setCategory,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  const wishlist = useWishlistStore((s) => s.wishlist);

  // Sync category or wishlist from URL query params if present
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat === 'bra' || cat === 'blouse') {
      setCategory(cat);
    }
  }, [searchParams, setCategory]);

  const isWishlistFilter = searchParams.get('filter') === 'wishlist';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (isWishlistFilter) {
      const wishlistIds = new Set(wishlist.map((w) => w.id));
      result = result.filter((p) => wishlistIds.has(p.id));
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Size filter
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.availableSizes && p.availableSizes.some((s) => selectedSizes.includes(s))
      );
    }

    // Cup filter (for bras)
    if (selectedCups.length > 0) {
      result = result.filter((p) =>
        p.category === 'bra' && p.availableCups && p.availableCups.some((c) => selectedCups.includes(c))
      );
    }

    // Padding filter
    if (selectedPadding !== 'all') {
      result = result.filter((p) => p.padding === selectedPadding);
    }

    // Wire filter
    if (selectedWire !== 'all') {
      result = result.filter((p) => p.wire === selectedWire);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric?.toLowerCase().includes(q)
      );
    }

    // Sort logic
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    category,
    selectedSizes,
    selectedCups,
    selectedPadding,
    selectedWire,
    searchQuery,
    sortBy,
    isWishlistFilter,
    wishlist,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-nude/70 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-brand-charcoal">
            {isWishlistFilter
              ? 'My Saved Wishlist'
              : category === 'bra'
              ? 'Bras & Intimate Wear'
              : category === 'blouse'
              ? 'Designer Saree Blouses'
              : 'All Boutique Collections'}
          </h1>
          <p className="text-xs sm:text-sm text-brand-subtle mt-1">
            Showing {filteredProducts.length} styles • Discreet packaging on every order
          </p>
        </div>

        {/* Quick Tools */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCalcOpen(true)}
            className="hidden sm:inline-flex"
          >
            <Ruler className="w-3.5 h-3.5 text-brand-roseGold mr-1.5" />
            Size Calculator
          </Button>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-white border border-brand-nude rounded-xl text-xs font-semibold text-brand-charcoal"
          >
            <SlidersHorizontal className="w-4 h-4 text-brand-roseGold" />
            Filters
          </button>

          <SortDropdown />
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 sticky top-28">
          <ProductFilters />
        </aside>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-lg font-bold">Filter Collections</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-brand-subtle" />
                </button>
              </div>
              <ProductFilters />
              <Button
                variant="luxury"
                fullWidth
                size="md"
                onClick={() => setMobileFilterOpen(false)}
                className="mt-6"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <main className="lg:col-span-3">
          {searchQuery && (
            <div className="mb-4 flex items-center justify-between bg-brand-cream px-4 py-2.5 rounded-xl border border-brand-nude text-xs">
              <span>
                Search results for: <strong>"{searchQuery}"</strong>
              </span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-brand-roseGold font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          )}

          <ProductGrid products={filteredProducts} onResetFilters={resetFilters} />
        </main>

      </div>

      {/* Sizing Tool Modal */}
      <BraSizeCalculatorModal
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
      />

    </div>
  );
}
