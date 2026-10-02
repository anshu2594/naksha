import React from 'react';
import { ShieldCheck, MapPin } from 'lucide-react';

export function AddressForm({ formData, onChange }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-brand-nude/80 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-brand-nude/60 pb-3">
        <MapPin className="w-5 h-5 text-brand-roseGold" />
        <h3 className="font-serif text-lg font-semibold text-brand-charcoal">
          Shipping & Delivery Details
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={onChange}
            placeholder="e.g. Priya Sharma"
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
            Mobile Number (For Courier Updates) *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={onChange}
            placeholder="e.g. 9876543210"
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
          Street Address, Flat / House No. *
        </label>
        <input
          type="text"
          name="address"
          required
          value={formData.address}
          onChange={onChange}
          placeholder="e.g. Flat 402, Lotus Residency, MG Road"
          className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
            City *
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={onChange}
            placeholder="e.g. Mumbai"
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
            State *
          </label>
          <input
            type="text"
            name="state"
            required
            value={formData.state}
            onChange={onChange}
            placeholder="e.g. Maharashtra"
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-brand-charcoal uppercase tracking-wider mb-1">
            PIN Code *
          </label>
          <input
            type="text"
            name="pincode"
            required
            value={formData.pincode}
            onChange={onChange}
            placeholder="e.g. 400001"
            className="w-full px-3.5 py-2.5 bg-brand-cream border border-brand-nude rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand-roseGold"
          />
        </div>
      </div>

      {/* Discreet Packaging Toggle */}
      <div className="pt-2">
        <label className="flex items-start gap-3 p-3.5 bg-brand-nude/40 rounded-xl border border-brand-champagne/60 cursor-pointer">
          <input
            type="checkbox"
            name="discreetPackage"
            checked={formData.discreetPackage}
            onChange={onChange}
            className="w-4 h-4 mt-0.5 text-brand-roseGold rounded focus:ring-brand-roseGold"
          />
          <div>
            <span className="text-xs font-bold text-brand-charcoal flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Discreet Packaging Guaranteed (Selected by default)
            </span>
            <p className="text-[11px] text-brand-subtle mt-0.5">
              Shipped in a plain tamper-evident brown outer box. Zero mentions of bra, blouse or lingerie on shipping labels.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
