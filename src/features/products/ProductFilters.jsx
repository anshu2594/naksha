import React from 'react';
import { Filter, RotateCcw, Check } from 'lucide-react';
import { useFilterStore } from '../../store/useFilterStore';
import { Button } from '../../components/common/Button';

export function ProductFilters() {
  const {
    category,
    selectedSizes,
    selectedCups,
    selectedPadding,
    selectedWire,
    setCategory,
    toggleSize,
    toggleCup,
    setSelectedPadding,
    setSelectedWire,
    resetFilters,
  } = useFilterStore();

  const braSizes = ['30', '32', '34', '36', '38', '40', '42'];
  const braCups = ['A', 'B', 'C', 'D', 'DD'];
  const blouseSizes = ['32', '34', '36', '38', '40', '42', '44'];

  return (
    <div className="bg-white p-5 rounded-2xl border border-brand-nude/70 shadow-xs space-y-6">
      
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-nude">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-roseGold" />
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-charcoal">
            Filters
          </h3>
        </div>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-brand-roseGold hover:text-brand-terracotta flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-subtle mb-2.5">
          Department
        </h4>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-brand-cream rounded-xl border border-brand-champagne/40 text-xs">
          {[
            { id: 'all', label: 'All' },
            { id: 'bra', label: 'Bras' },
            { id: 'blouse', label: 'Blouses' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.id)}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                category === item.id
                  ? 'bg-brand-roseGold text-white shadow-xs'
                  : 'text-brand-charcoal hover:bg-brand-nude/40'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* SIZES - Context aware for Bra vs Blouse */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-subtle">
            {category === 'blouse' ? 'Blouse Bust Sizes' : 'Band Sizes (Inches)'}
          </h4>
          {selectedSizes.length > 0 && (
            <span className="text-[10px] text-brand-roseGold font-semibold">
              {selectedSizes.length} selected
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {(category === 'blouse' ? blouseSizes : braSizes).map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-brand-charcoal text-white shadow-sm ring-2 ring-brand-charcoal ring-offset-1'
                    : 'bg-brand-cream text-brand-charcoal border border-brand-nude hover:border-brand-roseGold/60'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* CUP SIZES (Only for Bra or All) */}
      {category !== 'blouse' && (
        <div className="pt-2 border-t border-brand-nude/50">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-subtle">
              Cup Sizes
            </h4>
            {selectedCups.length > 0 && (
              <span className="text-[10px] text-brand-roseGold font-semibold">
                {selectedCups.length} selected
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {braCups.map((cup) => {
              const isSelected = selectedCups.includes(cup);
              return (
                <button
                  key={cup}
                  type="button"
                  onClick={() => toggleCup(cup)}
                  className={`w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-brand-roseGold text-white shadow-sm ring-2 ring-brand-roseGold ring-offset-1'
                      : 'bg-brand-cream text-brand-charcoal border border-brand-nude hover:border-brand-roseGold/60'
                  }`}
                >
                  {cup}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PADDING TYPE (For Bras) */}
      {category !== 'blouse' && (
        <div className="pt-2 border-t border-brand-nude/50">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-subtle mb-2.5">
            Padding Preference
          </h4>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'all', label: 'All Padding Types' },
              { id: 'Lightly Padded', label: 'Lightly Padded' },
              { id: 'Level 2 Graduated Padding', label: 'Push-Up Padding' },
              { id: 'Removable Breathable Pads', label: 'Removable Pads' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 cursor-pointer py-1 text-brand-charcoal hover:text-brand-roseGold"
              >
                <input
                  type="radio"
                  name="padding"
                  checked={selectedPadding === opt.id}
                  onChange={() => setSelectedPadding(opt.id)}
                  className="w-3.5 h-3.5 text-brand-roseGold focus:ring-brand-roseGold"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* WIRE TYPE (For Bras) */}
      {category !== 'blouse' && (
        <div className="pt-2 border-t border-brand-nude/50">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-subtle mb-2.5">
            Wiring
          </h4>
          <div className="space-y-1.5 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'Non-Wired', label: 'Wirefree / Zero Wire' },
              { id: 'Cushioned Underwire', label: 'Cushioned Underwire' },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex items-center gap-2 cursor-pointer py-1 text-brand-charcoal hover:text-brand-roseGold"
              >
                <input
                  type="radio"
                  name="wire"
                  checked={selectedWire === opt.id}
                  onChange={() => setSelectedWire(opt.id)}
                  className="w-3.5 h-3.5 text-brand-roseGold focus:ring-brand-roseGold"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Discreet Packaging Assurance Box in Filter Sidebar */}
      <div className="p-3 bg-brand-nude/40 rounded-xl border border-brand-champagne/40 text-[11px] text-brand-subtle">
        <span className="font-semibold text-brand-charcoal block mb-0.5">🔒 Privacy First Guarantee</span>
        Every order is packed in a neutral brown box with no lingerie descriptions on invoices or courier slips.
      </div>

    </div>
  );
}
