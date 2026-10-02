import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

export function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
      <div className="w-16 h-16 bg-brand-nude/70 text-brand-roseGold rounded-full flex items-center justify-center mx-auto">
        <Sparkles className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-serif font-bold text-brand-charcoal">Page Not Found</h1>
      <p className="text-xs sm:text-sm text-brand-subtle">
        The intimate collection or blouse page you are looking for may have been moved or updated.
      </p>
      <div className="pt-2">
        <Link to="/shop">
          <Button variant="luxury" size="md">
            Browse Boutique Collections
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
