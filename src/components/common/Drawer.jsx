import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  side = 'right',
  width = 'max-w-md',
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-charcoal/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className={cn('fixed inset-y-0 flex max-w-full', side === 'right' ? 'right-0 pl-10' : 'left-0 pr-10')}>
        <div
          className={cn(
            'w-screen bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out',
            width
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-brand-nude">
            <div>
              {title && <h2 className="text-lg font-serif font-semibold text-brand-charcoal">{title}</h2>}
              {subtitle && <p className="text-xs text-brand-subtle mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 text-brand-subtle hover:text-brand-charcoal hover:bg-brand-nude/40 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
