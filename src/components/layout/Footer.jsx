import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, Sparkles, HeartHandshake, Ruler, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-10 border-t border-brand-charcoal/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-gray-800 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold">100% Discreet Packaging</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
              Delivered in unbranded boxes with zero product names outside.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-rose-300 mb-3">
              <Ruler className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold">Guaranteed Perfect Fit</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
              Use our interactive Bra Calculator & Blouse alteration guide.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-amber-300 mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold">Hassle-Free Exchange</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
              Easy size exchange guarantee within 7 days of delivery.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-blush mb-3">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-semibold">Pure Fabric Promise</h4>
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">
              Skin-safe combed cotton, micro-modal, and genuine raw silks.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex flex-col items-start">
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                NAKSHA
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-brand-roseGold font-semibold -mt-1">
                Lingerie & Blouses
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Curated for elegance and absolute comfort. From everyday invisible t-shirt bras to royal hand-embroidered saree blouses.
            </p>
          </div>

          {/* Bras Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-brand-roseGold font-semibold mb-4">
              Bras & Lingerie
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/shop?cat=bra" className="hover:text-white transition-colors">Everyday T-Shirt Bras</Link></li>
              <li><Link to="/shop?cat=bra" className="hover:text-white transition-colors">Wireless & Zero-Feel</Link></li>
              <li><Link to="/shop?cat=bra" className="hover:text-white transition-colors">Push-Up & Plunge</Link></li>
              <li><Link to="/shop?cat=bra" className="hover:text-white transition-colors">Strapless & Multiway</Link></li>
              <li><Link to="/shop?cat=bra" className="hover:text-white transition-colors">Lace Bralettes</Link></li>
            </ul>
          </div>

          {/* Blouse Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-brand-roseGold font-semibold mb-4">
              Designer Blouses
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li><Link to="/shop?cat=blouse" className="hover:text-white transition-colors">Bridal Raw Silk Blouses</Link></li>
              <li><Link to="/shop?cat=blouse" className="hover:text-white transition-colors">Velvet Deep V-Neck</Link></li>
              <li><Link to="/shop?cat=blouse" className="hover:text-white transition-colors">Banarasi Brocade</Link></li>
              <li><Link to="/shop?cat=blouse" className="hover:text-white transition-colors">Handloom Cotton Workwear</Link></li>
              <li><Link to="/shop?cat=blouse" className="hover:text-white transition-colors">Backless with Latkan Dori</Link></li>
            </ul>
          </div>

          {/* Sizing & Help */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-brand-roseGold font-semibold mb-4">
              Fitting & Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li>
                <Link to="/bra-size-calculator" className="text-rose-300 font-semibold hover:text-white transition-colors flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5" />
                  Bra Size Calculator
                </Link>
              </li>
              <li><a href="#size-chart" className="hover:text-white transition-colors">Blouse Measurement Chart</a></li>
              <li><a href="#discreet" className="hover:text-white transition-colors">Discreet Shipping Promise</a></li>
              <li><a href="#returns" className="hover:text-white transition-colors">Easy Returns & Exchanges</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">24/7 Female Support Desk</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} NAKSHA Lingerie & Blouses. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Discreet & Secure Payments</span>
            <span>UPI • NetBanking • Cards • COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
