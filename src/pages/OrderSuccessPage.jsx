import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, PackageCheck, ArrowRight, Truck } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from '../components/common/Button';

export function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback mock if directly navigated
  const displayOrder = order || {
    orderId: 'NAKSHA-839210',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    total: 2098,
    paymentMethod: 'upi',
    shippingAddress: {
      fullName: 'Priya Sharma',
      address: 'Flat 402, Lotus Residency, MG Road',
      city: 'Mumbai',
      pincode: '400001',
      discreetPackage: true,
    },
    items: [
      {
        name: 'Cloud Comfort Seamless T-Shirt Bra',
        selectedSize: '34',
        selectedCup: 'C',
        selectedColor: 'Nude Beige',
        price: 899,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1596473536098-b80864ca06a8?auto=format&fit=crop&w=300&q=80',
      },
      {
        name: 'Naksha Push-Up Plunge Bra with Lace Wings',
        selectedSize: '34',
        selectedCup: 'C',
        selectedColor: 'Burgundy Wine',
        price: 1199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=300&q=80',
      }
    ]
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      
      {/* Success Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9 stroke-[2]" />
        </div>
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Confirmed & Payment Verified
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brand-charcoal">
          Thank You For Your Order!
        </h1>
        <p className="text-xs sm:text-sm text-brand-subtle max-w-md mx-auto">
          We've received your order and our boutique team has begun discreetly preparing your items.
        </p>
      </div>

      {/* Discreet Packaging Assurance Box */}
      <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3.5">
        <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950 space-y-0.5">
          <span className="font-bold block text-sm">Guaranteed 100% Discreet Packaging</span>
          <p className="text-emerald-900 leading-relaxed">
            Your package will arrive in a plain, unmarked brown carton with zero external logos or intimates descriptions. Courier label states only: <strong>"NAKSHA LOGISTICS"</strong>.
          </p>
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-nude/80 shadow-soft space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-brand-nude/60 gap-2 text-xs">
          <div>
            <span className="text-brand-subtle block">Order Reference:</span>
            <strong className="text-sm font-bold text-brand-charcoal">{displayOrder.orderId}</strong>
          </div>
          <div>
            <span className="text-brand-subtle block">Order Date:</span>
            <strong className="text-brand-charcoal">{displayOrder.date}</strong>
          </div>
          <div>
            <span className="text-brand-subtle block">Estimated Delivery:</span>
            <strong className="text-emerald-700 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> In 2-4 Business Days
            </strong>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-semibold text-brand-charcoal">
            Items in This Shipment
          </h3>
          <div className="divide-y divide-brand-nude/50">
            {displayOrder.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-18 object-cover rounded-lg bg-brand-cream border border-brand-nude shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-brand-charcoal truncate">
                    {item.name}
                  </h4>
                  <div className="text-[11px] text-brand-subtle mt-0.5 flex gap-2">
                    <span>Size: <strong>{item.selectedSize}{item.selectedCup || ''}</strong></span>
                    {item.selectedColor && <span>• Shade: <strong>{item.selectedColor}</strong></span>}
                    <span>• Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right text-xs sm:text-sm font-bold text-brand-charcoal">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Delivery Address */}
        <div className="pt-4 border-t border-brand-nude/60 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-brand-subtle uppercase tracking-wider font-semibold block mb-1">
              Shipping Destination
            </span>
            <p className="font-semibold text-brand-charcoal">{displayOrder.shippingAddress?.fullName}</p>
            <p className="text-brand-subtle">{displayOrder.shippingAddress?.address}</p>
            <p className="text-brand-subtle">
              {displayOrder.shippingAddress?.city}, {displayOrder.shippingAddress?.pincode}
            </p>
          </div>

          <div className="sm:text-right space-y-1">
            <span className="text-brand-subtle uppercase tracking-wider font-semibold block">
              Payment Summary
            </span>
            <p className="text-brand-subtle">Method: <strong className="uppercase text-brand-charcoal">{displayOrder.paymentMethod}</strong></p>
            <div className="text-lg font-serif font-bold text-brand-charcoal pt-1">
              Total Paid: {formatCurrency(displayOrder.total)}
            </div>
          </div>
        </div>

      </div>

      {/* Next Actions */}
      <div className="flex justify-center pt-2">
        <Link to="/shop">
          <Button variant="luxury" size="lg">
            Continue Shopping
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
