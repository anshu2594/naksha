import React from 'react';
import { ProductCard } from './ProductCard';
import { PackageOpen } from 'lucide-react';
import { Button } from '../../components/common/Button';

export function ProductGrid({ products = [], onResetFilters }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-brand-nude/60 p-8">
        <div className="w-16 h-16 bg-brand-nude/50 rounded-full flex items-center justify-center text-brand-roseGold mx-auto mb-4">
          <PackageOpen className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h3 className="text-lg font-serif font-semibold text-brand-charcoal">No styles found</h3>
        <p className="text-xs sm:text-sm text-brand-subtle max-w-md mx-auto mt-1 mb-6">
          We couldn't find any products matching your specific size or filter selections. Try clearing your filters or selecting a different category.
        </p>
        {onResetFilters && (
          <Button variant="luxury" size="sm" onClick={onResetFilters}>
            Reset All Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
