export const CATEGORIES = [
  {
    id: 'bra',
    name: 'Bras & Lingerie',
    slug: 'bras',
    description: 'Everyday comfort, push-ups, wirefree & luxury bridal lingerie tailored for perfect support.',
    image: 'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'all-bras', name: 'All Bras', filter: 'all' },
      { id: 't-shirt', name: 'T-Shirt Bras', filter: 't-shirt' },
      { id: 'wireless', name: 'Wireless & Comfort', filter: 'wireless' },
      { id: 'push-up', name: 'Push-Up Bras', filter: 'push-up' },
      { id: 'bralette', name: 'Lace Bralettes', filter: 'bralette' },
      { id: 'strapless', name: 'Strapless / Multiway', filter: 'strapless' },
      { id: 'sports', name: 'Sports Bras', filter: 'sports' },
    ]
  },
  {
    id: 'blouse',
    name: 'Designer Blouses',
    slug: 'blouses',
    description: 'Ready-to-wear saree blouses with modern necklines, royal embroidery, and customizable margins.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'all-blouses', name: 'All Blouses', filter: 'all' },
      { id: 'bridal-blouse', name: 'Bridal & Zari Work', filter: 'bridal' },
      { id: 'velvet', name: 'Royal Velvet Blouses', filter: 'velvet' },
      { id: 'sleeveless', name: 'Sleeveless & Boat Neck', filter: 'sleeveless' },
      { id: 'brocade', name: 'Banarasi Brocade', filter: 'brocade' },
      { id: 'cotton-daily', name: 'Handloom Cotton', filter: 'cotton' },
      { id: 'backless-dori', name: 'Backless & Latkan Dori', filter: 'backless' },
    ]
  }
];
