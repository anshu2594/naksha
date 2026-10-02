import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Scissors,
  Star,
  Check,
  ChevronRight,
  Ruler,
} from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Accordion, AccordionItem } from '../components/common/Accordion';
import { StarRating } from '../components/common/StarRating';
import { BraCupSelector } from '../features/products/BraCupSelector';
import { BlouseSizeSelector } from '../features/products/BlouseSizeSelector';
import { BlouseBackDesignViewer } from '../features/products/BlouseBackDesignViewer';
import { BraSizeCalculatorModal } from '../features/size-guide/BraSizeCalculatorModal';
import { BlouseMeasurementChartModal } from '../features/size-guide/BlouseMeasurementChart';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import { formatCurrency } from '../utils/formatCurrency';

export function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeBlouseAngle, setActiveBlouseAngle] = useState('front');
  const [selectedSize, setSelectedSize] = useState(product.availableSizes?.[1] || product.availableSizes?.[0]);
  const [selectedCup, setSelectedCup] = useState(product.availableCups?.[1] || product.availableCups?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const [isBraCalcOpen, setIsBraCalcOpen] = useState(false);
  const [isBlouseChartOpen, setIsBlouseChartOpen] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  // Reset variation when product changes
  useEffect(() => {
    setSelectedSize(product.availableSizes?.[1] || product.availableSizes?.[0]);
    setSelectedCup(product.availableCups?.[1] || product.availableCups?.[0]);
    setSelectedColor(product.colors?.[0]);
    setActiveImageIndex(0);
    setActiveBlouseAngle('front');
  }, [product]);

  const handleAngleToggle = (angle) => {
    setActiveBlouseAngle(angle);
    if (angle === 'front') {
      setActiveImageIndex(0);
    } else if (product.images.length > 1) {
      setActiveImageIndex(1);
    }
  };

  const handleAddToCart = () => {
    addItem(product, {
      selectedSize,
      selectedCup: product.category === 'bra' ? selectedCup : null,
      selectedColor,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brand-subtle">
        <Link to="/" className="hover:text-brand-charcoal">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to={`/shop?cat=${product.category}`} className="hover:text-brand-charcoal capitalize">
          {product.category === 'bra' ? 'Bras' : 'Blouses'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-charcoal font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Product Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Visual */}
          <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-brand-cream border border-brand-nude shadow-soft">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-all duration-300"
            />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isBestSeller && <Badge variant="accent">BESTSELLER</Badge>}
              {discountPercent > 0 && <Badge variant="gold">{discountPercent}% OFF</Badge>}
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                isInWishlist
                  ? 'bg-rose-50 text-rose-600 shadow-md'
                  : 'bg-white/90 text-brand-charcoal hover:bg-white hover:text-rose-600 backdrop-blur-xs shadow-sm'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Interactive Front vs Back Toggle for Blouses */}
          {product.category === 'blouse' && (
            <BlouseBackDesignViewer
              frontImage={product.images[0]}
              backImage={product.images[1]}
              activeView={activeBlouseAngle}
              onToggleView={handleAngleToggle}
              backDesignTitle={product.backDesign}
            />
          )}

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    if (product.category === 'blouse') {
                      setActiveBlouseAngle(idx === 1 ? 'back' : 'front');
                    }
                  }}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-brand-roseGold shadow-xs ring-2 ring-brand-roseGold/20'
                      : 'border-brand-nude opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1 rounded">
                    {idx === 0 ? 'Front' : 'Back'}
                  </span>
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column: Product Purchasing Specs */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              <span className="text-xs text-brand-subtle">• 98% Recommended Fit</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brand-charcoal">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-brand-subtle mt-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-brand-nude/70">
            <span className="text-3xl font-serif font-bold text-brand-charcoal">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-brand-subtle line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Save {discountPercent}%
              </span>
            )}
          </div>

          {/* Color Shade Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-brand-charcoal uppercase tracking-wider block">
                Selected Shade: <span className="font-normal normal-case text-brand-roseGold font-semibold ml-1">{selectedColor?.name}</span>
              </label>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, idx) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        isSelected
                          ? 'border-brand-roseGold scale-110 shadow-sm'
                          : 'border-transparent hover:scale-105'
                      }`}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizing Section: Bra Dual Matrix OR Blouse Selector */}
          <div className="pt-2">
            {product.category === 'bra' ? (
              <BraCupSelector
                availableSizes={product.availableSizes}
                availableCups={product.availableCups}
                selectedSize={selectedSize}
                selectedCup={selectedCup}
                onSelectSize={setSelectedSize}
                onSelectCup={setSelectedCup}
                onOpenCalculator={() => setIsBraCalcOpen(true)}
              />
            ) : (
              <BlouseSizeSelector
                availableSizes={product.availableSizes}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
                alterationMargin={product.alterationMargin}
                onOpenSizeChart={() => setIsBlouseChartOpen(true)}
              />
            )}
          </div>

          {/* Add to Bag and Buy Now CTAs */}
          <div className="space-y-2.5 pt-2">
            <Button
              variant="luxury"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
            >
              Add to Bag • {formatCurrency(product.price)}
            </Button>
            
            <Button
              variant="dark"
              size="lg"
              fullWidth
              onClick={handleBuyNow}
            >
              Buy Now with 1-Click
            </Button>

            {addedToast && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-xl text-center font-medium animate-in fade-in">
                ✓ Added to your bag! Size: {selectedSize}{product.category === 'bra' ? selectedCup : ''} ({selectedColor?.name})
              </div>
            )}
          </div>

          {/* Discreet Assurance Card */}
          <div className="p-3.5 bg-brand-cream rounded-2xl border border-brand-champagne/60 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-brand-charcoal block">100% Discreet Packaging Guaranteed</span>
              <p className="text-brand-subtle mt-0.5 leading-snug">
                Shipped in a neutral brown box with no intimate product names on outer airway bills.
              </p>
            </div>
          </div>

          {/* Accordion Specs */}
          <Accordion>
            <AccordionItem title="Fabric & Construction Details" defaultOpen={true}>
              <div className="space-y-2">
                <p><strong>Primary Fabric:</strong> {product.fabric}</p>
                {product.padding && <p><strong>Padding:</strong> {product.padding}</p>}
                {product.wire && <p><strong>Underwire:</strong> {product.wire}</p>}
                {product.neckline && <p><strong>Neckline:</strong> {product.neckline}</p>}
                {product.backDesign && <p><strong>Back Design:</strong> {product.backDesign}</p>}
                {product.closure && <p><strong>Closure:</strong> {product.closure}</p>}
                <ul className="list-disc list-inside mt-2 text-brand-charcoal space-y-1">
                  {product.features?.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            </AccordionItem>

            <AccordionItem title="Fit & Alteration Guarantee">
              <p>
                {product.category === 'bra'
                  ? 'Our bras are constructed with 4-row hook-and-eye closures for micro-adjustability as your body shifts throughout the month.'
                  : `This blouse comes with ${product.alterationMargin || '2 inches'} of internal seam allowance. You can easily expand the blouse by loosening the interior straight chain stitch.`}
              </p>
            </AccordionItem>

            <AccordionItem title="Shipping & 7-Day Exchange Policy">
              <p>
                Free shipping on orders above ₹999. If the fit is slightly tight or loose, we offer a hassle-free size replacement within 7 days of receiving your package.
              </p>
            </AccordionItem>
          </Accordion>

        </div>

      </div>

      {/* Sizing Modals */}
      <BraSizeCalculatorModal
        isOpen={isBraCalcOpen}
        onClose={() => setIsBraCalcOpen(false)}
      />
      <BlouseMeasurementChartModal
        isOpen={isBlouseChartOpen}
        onClose={() => setIsBlouseChartOpen(false)}
      />

    </div>
  );
}
