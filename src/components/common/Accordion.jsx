import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export function AccordionItem({ title, children, defaultOpen = false, icon = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-nude/70 py-3 last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group py-1"
      >
        <div className="flex items-center gap-2.5">
          {icon && <span className="text-brand-roseGold">{icon}</span>}
          <span className="text-sm font-medium text-brand-charcoal group-hover:text-brand-roseGold transition-colors">
            {title}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-brand-subtle transition-transform duration-200 group-hover:text-brand-roseGold',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div className="pt-2.5 pb-2 text-xs sm:text-sm text-brand-subtle leading-relaxed animate-in fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );
}

export function Accordion({ children, className = '' }) {
  return (
    <div className={cn('divide-y divide-brand-nude/60 rounded-xl bg-white/60 p-4 border border-brand-nude/40', className)}>
      {children}
    </div>
  );
}
