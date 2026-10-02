import React, { useState } from 'react';
import { Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../../components/common/Button';

export function OrderSummary({
  subtotal,
  savings = 0,
  shippingFee = 0,
  onProceedToCheckout,
  showCheckoutBtn = true,
  isCheckingOut = false,
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FIRST10' || clean === 'NAKSHA10') {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setPromoSuccess(`Code ${clean} applied: 10% OFF (-${formatCurrency(discount)})`);
    } else if (clean === 'FREESHIP') {
      setAppliedDiscount(shippingFee);
      setPromoSuccess(`Free shipping coupon applied!`);
    } else {
      setPromoError('Invalid coupon code. Try FIRST10 for 10% off.');
    }
  };

  const finalTotal = Math.max(0, subtotal - appliedDiscount + (subtotal >= 999 ? 0 : shippingFee));

  return (
    <div className="bg-white p-6 rounded-2xl border border-brand-nude/80 shadow-xs space-y-5">
      <h3 className="font-serif text-lg font-semibold text-brand-charcoal border-b border-brand-nude/60 pb-3">
        Order Summary
      </h3>

      {/* Line Items */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-brand-subtle">
          <span>Bag Subtotal</span>
          <span className="font-semibold text-brand-charcoal">{formatCurrency(subtotal)}</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-emerald-700">
            <span>Special Style Discount</span>
            <span>-{formatCurrency(savings)}</span>
          </div>
        )}

        {appliedDiscount > 0 && (
          <div className="flex justify-between text-brand-roseGold font-semibold">
            <span>Coupon Discount</span>
            <span>-{formatCurrency(appliedDiscount)}</span>
          </div>
        )}

        <div className="flex justify-between text-brand-subtle">
          <span>Discreet Delivery</span>
          <span>
            {subtotal >= 999 ? (
              <span className="text-emerald-700 font-semibold uppercase text-xs">FREE</span>
            ) : (
              formatCurrency(shippingFee || 99)
            )}
          </span>
        </div>
      </div>

      {/* Promo Code Input */}
      <form onSubmit={handleApplyPromo} className="pt-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="w-4 h-4 text-brand-subtle absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Coupon code (e.g. FIRST10)"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-brand-cream border border-brand-nude rounded-xl text-xs sm:text-sm uppercase font-semibold focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
            />
          </div>
          <Button type="submit" variant="secondary" size="sm">
            Apply
          </Button>
        </div>
        {promoSuccess && <p className="text-xs text-emerald-700 mt-1.5 font-medium">{promoSuccess}</p>}
        {promoError && <p className="text-xs text-rose-600 mt-1.5">{promoError}</p>}
      </form>

      {/* Total */}
      <div className="pt-4 border-t border-brand-nude flex items-baseline justify-between">
        <div>
          <span className="text-base font-bold text-brand-charcoal block">Total Amount</span>
          <span className="text-[11px] text-brand-subtle">Includes all taxes</span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-serif font-bold text-brand-charcoal">
            {formatCurrency(finalTotal)}
          </span>
        </div>
      </div>

      {/* Discreet Packaging Assurance */}
      <div className="p-3 bg-brand-cream rounded-xl border border-brand-champagne/40 flex items-start gap-2.5 text-xs text-brand-charcoal">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <span className="text-[11px] text-brand-subtle leading-snug">
          <strong>Privacy Promise:</strong> Invoices inside the package only. Plain exterior packaging with zero intimates branding.
        </span>
      </div>

      {/* Checkout Button */}
      {showCheckoutBtn && onProceedToCheckout && (
        <Button
          variant="luxury"
          size="lg"
          fullWidth
          onClick={onProceedToCheckout}
          isLoading={isCheckingOut}
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
}
