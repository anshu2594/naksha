import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatCurrency';
import { AddressForm } from '../features/checkout/AddressForm';
import { PaymentSelector } from '../features/checkout/PaymentSelector';
import { OrderSummary } from '../features/cart/OrderSummary';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTotalSavings, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    discreetPackage: true,
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = getSubtotal();
  const savings = getTotalSavings();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Simple validation
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      setErrorMsg('Please complete all required shipping fields before placing your order.');
      return;
    }

    if (items.length === 0) {
      navigate('/shop');
      return;
    }

    setIsProcessing(true);

    // Simulate payment and order creation
    setTimeout(() => {
      const orderDetails = {
        orderId: `NAKSHA-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...items],
        total: subtotal >= 999 ? subtotal : subtotal + 99,
        shippingAddress: { ...formData },
        paymentMethod,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };

      // Clear cart and redirect
      clearCart();
      setIsProcessing(false);
      navigate('/order-success', { state: { order: orderDetails } });
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-brand-charcoal">Your bag is empty</h2>
        <p className="text-xs text-brand-subtle">Add products to your bag before proceeding to checkout.</p>
        <Link to="/shop" className="text-brand-roseGold font-semibold hover:underline block text-sm">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Checkout Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-nude/70 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-roseGold font-bold flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            256-Bit SSL Encrypted Checkout
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal mt-1">
            Express Checkout
          </h1>
        </div>

        <Link to="/cart" className="text-xs sm:text-sm font-semibold text-brand-subtle hover:text-brand-charcoal flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          Review Bag Items
        </Link>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl border border-rose-200">
          {errorMsg}
        </div>
      )}

      {/* Main Grid */}
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Shipping & Payment */}
        <div className="lg:col-span-8 space-y-8">
          <AddressForm formData={formData} onChange={handleInputChange} />
          <PaymentSelector
            selectedMethod={paymentMethod}
            onSelectMethod={setPaymentMethod}
          />
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <OrderSummary
            subtotal={subtotal}
            savings={savings}
            shippingFee={99}
            onProceedToCheckout={handlePlaceOrder}
            showCheckoutBtn={true}
            isCheckingOut={isProcessing}
          />
        </div>

      </form>

    </div>
  );
}
