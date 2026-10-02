import React from 'react';
import { cn } from '../../utils/cn';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  const variants = {
    primary: 'bg-brand-roseGold text-white hover:bg-brand-terracotta focus:ring-brand-roseGold shadow-sm',
    secondary: 'bg-brand-nude text-brand-charcoal hover:bg-brand-blush/60 focus:ring-brand-roseGold',
    outline: 'border border-brand-roseGold/40 text-brand-charcoal hover:bg-brand-roseGold/10 focus:ring-brand-roseGold',
    luxury: 'bg-gradient-to-r from-brand-roseGold to-brand-terracotta text-white shadow-md hover:shadow-lg focus:ring-brand-roseGold',
    ghost: 'text-brand-charcoal hover:bg-brand-nude/50 focus:ring-brand-subtle',
    dark: 'bg-brand-charcoal text-white hover:bg-black focus:ring-brand-charcoal',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3.5 gap-2.5 font-semibold',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}
