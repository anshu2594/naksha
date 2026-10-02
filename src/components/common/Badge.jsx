import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    default: 'bg-brand-nude text-brand-charcoal border border-brand-champagne/40',
    rose: 'bg-rose-100 text-rose-800 border border-rose-200',
    gold: 'bg-amber-50 text-amber-900 border border-amber-200/80',
    dark: 'bg-brand-charcoal text-white',
    discreet: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
    accent: 'bg-brand-roseGold text-white shadow-xs',
  };

  const sizes = {
    xs: 'text-[10px] px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span className={cn(baseStyles, variants[variant] || variants.default, sizes[size] || sizes.sm, className)}>
      {children}
    </span>
  );
}
