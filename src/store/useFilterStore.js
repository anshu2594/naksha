import { create } from 'zustand';

export const useFilterStore = create((set) => ({
  category: 'all', // 'all' | 'bra' | 'blouse'
  subCategory: 'all',
  selectedSizes: [],
  selectedCups: [],
  selectedPadding: 'all',
  selectedWire: 'all',
  selectedNeckline: 'all',
  selectedSleeve: 'all',
  sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  searchQuery: '',

  setCategory: (category) => set({ category, subCategory: 'all' }),
  setSubCategory: (subCategory) => set({ subCategory }),
  
  toggleSize: (size) => set((state) => ({
    selectedSizes: state.selectedSizes.includes(size)
      ? state.selectedSizes.filter((s) => s !== size)
      : [...state.selectedSizes, size]
  })),

  toggleCup: (cup) => set((state) => ({
    selectedCups: state.selectedCups.includes(cup)
      ? state.selectedCups.filter((c) => c !== cup)
      : [...state.selectedCups, cup]
  })),

  setSelectedPadding: (padding) => set({ selectedPadding: padding }),
  setSelectedWire: (wire) => set({ selectedWire: wire }),
  setSelectedNeckline: (neckline) => set({ selectedNeckline: neckline }),
  setSelectedSleeve: (sleeve) => set({ selectedSleeve: sleeve }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  resetFilters: () => set({
    category: 'all',
    subCategory: 'all',
    selectedSizes: [],
    selectedCups: [],
    selectedPadding: 'all',
    selectedWire: 'all',
    selectedNeckline: 'all',
    selectedSleeve: 'all',
    sortBy: 'featured',
    searchQuery: '',
  })
}));
