import React from 'react';
import { Scissors, Ruler } from 'lucide-react';

export function BlouseSizeSelector({
  availableSizes = [],
  selectedSize,
  onSelectSize,
  alterationMargin = '2 inches extra margin',
  onOpenSizeChart,
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
          Select Ready-Made Bust Size
        </label>
        {onOpenSizeChart && (
          <button
            type="button"
            onClick={onOpenSizeChart}
            className="text-xs font-semibold text-brand-roseGold hover:text-brand-terracotta flex items-center gap-1"
          >
            <Ruler className="w-3.5 h-3.5" />
            Blouse Size Chart
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2.5">
        {availableSizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelectSize(size)}
              className={`min-w-12 h-11 px-3 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-brand-velvet text-white shadow-sm ring-2 ring-brand-velvet ring-offset-2'
                  : 'bg-white text-brand-charcoal border border-brand-nude hover:border-brand-roseGold'
              }`}
            >
              Size {size}
            </button>
          );
        })}
      </div>

      {/* Alteration margin notification */}
      <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900">
        <Scissors className="w-4 h-4 text-amber-700 shrink-0" />
        <span>
          Includes <strong>{alterationMargin}</strong> inside both side seams for effortless custom fitting.
        </span>
      </div>
    </div>
  );
}
