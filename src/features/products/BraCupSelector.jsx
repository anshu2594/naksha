import React from 'react';
import { Ruler } from 'lucide-react';

export function BraCupSelector({
  availableSizes = [],
  availableCups = [],
  selectedSize,
  selectedCup,
  onSelectSize,
  onSelectCup,
  onOpenCalculator,
}) {
  return (
    <div className="space-y-4">
      {/* Band Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
            1. Select Band Size (Underbust)
          </label>
          {onOpenCalculator && (
            <button
              type="button"
              onClick={onOpenCalculator}
              className="text-xs font-semibold text-brand-roseGold hover:text-brand-terracotta flex items-center gap-1"
            >
              <Ruler className="w-3.5 h-3.5" />
              Find My Size
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => onSelectSize(size)}
                className={`w-11 h-11 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-brand-charcoal text-white shadow-sm ring-2 ring-brand-charcoal ring-offset-2'
                    : 'bg-white text-brand-charcoal border border-brand-nude hover:border-brand-roseGold'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cup Size Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider">
            2. Select Cup Size
          </label>
          <span className="text-[11px] text-brand-subtle">
            {selectedSize && selectedCup ? `Current Size: ${selectedSize}${selectedCup}` : 'Please choose cup'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableCups.map((cup) => {
            const isSelected = selectedCup === cup;
            return (
              <button
                key={cup}
                type="button"
                onClick={() => onSelectCup(cup)}
                className={`w-11 h-11 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-brand-roseGold text-white shadow-sm ring-2 ring-brand-roseGold ring-offset-2'
                    : 'bg-white text-brand-charcoal border border-brand-nude hover:border-brand-roseGold'
                }`}
              >
                {cup}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
