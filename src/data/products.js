export const products = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    price: 3499,
    category: "Electronics",
    rating: 4.8,
    reviews: 1240,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Premium over-ear headphones with 40hr battery life, adaptive noise cancellation, and studio-quality audio. Crafted for audiophiles who refuse to compromise.",
    featured: true,
    stock: 15
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    price: 8999,
    category: "Accessories",
    rating: 4.9,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    description: "Swiss movement, genuine leather strap, sapphire crystal glass. A timeless piece that blends precision engineering with refined aesthetics.",
    featured: true,
    stock: 8
  },
  {
    id: 3,
    name: "Mechanical Keyboard",
    price: 6499,
    category: "Electronics",
    rating: 4.7,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    description: "TKL layout with Cherry MX switches, per-key RGB, aluminum frame, and detachable USB-C cable. Built for those who take their craft seriously.",
    featured: true,
    stock: 22
  },
  {
    id: 4,
    name: "Smart Fitness Tracker",
    price: 2999,
    category: "Wearables",
    rating: 4.5,
    reviews: 3450,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80",
    description: "Heart rate, SpO2, sleep analysis, 7-day battery, and 50m water resistance. Track every metric that matters.",
    featured: false,
    stock: 40
  },
  {
    id: 5,
    name: "Portable Bluetooth Speaker",
    price: 1999,
    category: "Electronics",
    rating: 4.6,
    reviews: 990,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    description: "360° surround sound, IPX7 waterproof, 20hr playback, and USB-C charging. Your adventure soundtrack, redefined.",
    featured: false,
    stock: 30
  },
  {
    id: 6,
    name: "Ceramic Pour-Over Coffee Set",
    price: 1499,
    category: "Kitchen",
    rating: 4.8,
    reviews: 540,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    description: "Hand-thrown ceramic dripper with matching mug and stainless gooseneck kettle. Elevate your morning ritual.",
    featured: false,
    stock: 18
  },
  {
    id: 7,
    name: "Modular Desk Lamp",
    price: 2799,
    category: "Home",
    rating: 4.7,
    reviews: 410,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
    description: "Touch-dimming, 3 colour temperatures, USB charging port, and flexible arm. Form and function in perfect equilibrium.",
    featured: true,
    stock: 12
  },
  {
    id: 8,
    name: "Running Shoes Pro",
    price: 7499,
    category: "Sports",
    rating: 4.9,
    reviews: 2800,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    description: "Carbon-fiber plate, responsive foam midsole, and breathable mesh upper. Break your personal record.",
    featured: false,
    stock: 25
  },
  {
    id: 9,
    name: "Succulent Terrarium Kit",
    price: 999,
    category: "Home",
    rating: 4.6,
    reviews: 720,
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&q=80",
    description: "Glass geometric terrarium with 3 hand-picked succulents, decorative pebbles, and planting soil. Bring life to your workspace.",
    featured: false,
    stock: 35
  },
  {
    id: 10,
    name: "Hardcover Dot-Grid Journal",
    price: 699,
    category: "Stationery",
    rating: 4.8,
    reviews: 1600,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600&q=80",
    description: "200gsm ivory pages, lay-flat binding, ribbon bookmark, and numbered pages with index. Your thoughts deserve quality.",
    featured: false,
    stock: 60
  },
  {
    id: 11,
    name: "Wooden Chess Set",
    price: 4299,
    category: "Games",
    rating: 4.9,
    reviews: 330,
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?w=600&q=80",
    description: "Hand-carved walnut and maple pieces, roll-up board, and storage bag. Strategy, beauty, and legacy in one set.",
    featured: false,
    stock: 10
  },
  {
    id: 12,
    name: "Polaroid Instant Camera",
    price: 5499,
    category: "Electronics",
    rating: 4.7,
    reviews: 1450,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    description: "Double exposure, self-timer, built-in flash, and creative filters. Capture moments in an instant — literally.",
    featured: true,
    stock: 20
  }
];

export const categories = [...new Set(products.map(p => p.category))];
