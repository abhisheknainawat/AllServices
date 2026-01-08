import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

// Demo data - Comprehensive service listings
const DEMO_SERVICES = [
  // CARPENTER SERVICES
  {
    _id: "1",
    name: "Custom Furniture Making",
    category: "carpenter",
    price: 75,
    priceType: "hour",
    description: "Expert custom carpentry and furniture design. We create bespoke pieces tailored to your needs.",
    rating: 4.9,
    totalReviews: 120,
    provider: "Woodcraft Studio"
  },
  {
    _id: "2",
    name: "Home Renovation & Repairs",
    category: "carpenter",
    price: 65,
    priceType: "hour",
    description: "Professional home renovation, wall installations, and structural repairs.",
    rating: 4.8,
    totalReviews: 95,
    provider: "BuildRight Carpentry"
  },
  {
    _id: "3",
    name: "Cabinet & Wardrobe Installation",
    category: "carpenter",
    price: 80,
    priceType: "hour",
    description: "Custom cabinets, wardrobes, and storage solutions for modern homes.",
    rating: 4.7,
    totalReviews: 110,
    provider: "Cabinet Experts"
  },
  {
    _id: "4",
    name: "Door & Window Fitting",
    category: "carpenter",
    price: 55,
    priceType: "hour",
    description: "Professional installation and repair of doors, windows, and frames.",
    rating: 4.6,
    totalReviews: 85,
    provider: "Frame Masters"
  },

  // GUITARIST SERVICES
  {
    _id: "5",
    name: "Guitar Lessons - Beginner",
    category: "guitarist",
    price: 40,
    priceType: "hour",
    description: "Perfect for beginners. Learn guitar basics, chords, and simple songs.",
    rating: 4.9,
    totalReviews: 150,
    provider: "Guitar Academy"
  },
  {
    _id: "6",
    name: "Advanced Guitar Training",
    category: "guitarist",
    price: 80,
    priceType: "hour",
    description: "Advanced techniques, music theory, and professional-level instruction.",
    rating: 5.0,
    totalReviews: 95,
    provider: "Guitar Masters"
  },
  {
    _id: "7",
    name: "Live Guitar Performance",
    category: "guitarist",
    price: 150,
    priceType: "event",
    description: "Professional live guitar performances for weddings, events, and parties.",
    rating: 4.95,
    totalReviews: 120,
    provider: "Melody Performers"
  },
  {
    _id: "8",
    name: "Music Production & Recording",
    category: "guitarist",
    price: 100,
    priceType: "hour",
    description: "Professional recording services with high-quality equipment.",
    rating: 4.8,
    totalReviews: 75,
    provider: "Sound Studio Pro"
  },

  // SALON SERVICES
  {
    _id: "9",
    name: "Hair Cut & Styling",
    category: "salon",
    price: 30,
    priceType: "service",
    description: "Professional haircut and styling for all hair types.",
    rating: 4.7,
    totalReviews: 200,
    provider: "Hair Haven Salon"
  },
  {
    _id: "10",
    name: "Bridal Makeup & Hair",
    category: "salon",
    price: 150,
    priceType: "service",
    description: "Complete bridal packages with makeup, hair, and consultation.",
    rating: 5.0,
    totalReviews: 180,
    provider: "Glamour Wedding Studio"
  },
  {
    _id: "11",
    name: "Hair Coloring & Treatment",
    category: "salon",
    price: 80,
    priceType: "service",
    description: "Professional hair coloring, highlights, and deep conditioning treatments.",
    rating: 4.8,
    totalReviews: 160,
    provider: "Color Perfect Salon"
  },
  {
    _id: "12",
    name: "Spa & Facial Services",
    category: "salon",
    price: 60,
    priceType: "service",
    description: "Relaxing spa treatments, facials, and skincare services.",
    rating: 4.9,
    totalReviews: 140,
    provider: "Zen Spa & Wellness"
  },

  // ELECTRICIAN SERVICES
  {
    _id: "13",
    name: "Residential Electrical Repair",
    category: "electrician",
    price: 60,
    priceType: "hour",
    description: "Licensed electrician for all home electrical repairs and maintenance.",
    rating: 4.9,
    totalReviews: 200,
    provider: "ElectroFix"
  },
  {
    _id: "14",
    name: "Home Wiring & Installation",
    category: "electrician",
    price: 75,
    priceType: "hour",
    description: "Complete electrical wiring, new installations, and upgrades.",
    rating: 4.8,
    totalReviews: 170,
    provider: "PowerLine Electricians"
  },
  {
    _id: "15",
    name: "Lighting Design & Setup",
    category: "electrician",
    price: 55,
    priceType: "hour",
    description: "Modern lighting design, LED installation, and ambiance creation.",
    rating: 4.7,
    totalReviews: 125,
    provider: "Bright Spaces Electric"
  },
  {
    _id: "16",
    name: "Solar Panel Installation",
    category: "electrician",
    price: 90,
    priceType: "hour",
    description: "Professional solar panel installation and energy solutions.",
    rating: 4.95,
    totalReviews: 95,
    provider: "SolarTech Solutions"
  },

  // TECHNICIAN SERVICES
  {
    _id: "17",
    name: "AC & HVAC Service",
    category: "technician",
    price: 70,
    priceType: "hour",
    description: "Air conditioning and HVAC installation, repair, and maintenance.",
    rating: 4.8,
    totalReviews: 180,
    provider: "Cool Comfort Tech"
  },
  {
    _id: "18",
    name: "Water Purifier Service",
    category: "technician",
    price: 50,
    priceType: "service",
    description: "Water filter installation, replacement, and system maintenance.",
    rating: 4.7,
    totalReviews: 150,
    provider: "Pure Water Systems"
  },
  {
    _id: "19",
    name: "Refrigerator Repair",
    category: "technician",
    price: 65,
    priceType: "service",
    description: "Expert refrigerator and appliance repair services.",
    rating: 4.9,
    totalReviews: 160,
    provider: "CoolBox Technicians"
  },
  {
    _id: "20",
    name: "Washing Machine Service",
    category: "technician",
    price: 55,
    priceType: "service",
    description: "Washing machine repair, maintenance, and installation.",
    rating: 4.6,
    totalReviews: 140,
    provider: "Wash Care Specialists"
  },

  // HOUSE KEEPING SERVICES
  {
    _id: "21",
    name: "Deep House Cleaning",
    category: "house_keeping",
    price: 40,
    priceType: "hour",
    description: "Complete deep cleaning of your entire home.",
    rating: 4.8,
    totalReviews: 220,
    provider: "Clean Homes Pro"
  },
  {
    _id: "22",
    name: "Regular Maintenance Cleaning",
    category: "house_keeping",
    price: 30,
    priceType: "hour",
    description: "Weekly or bi-weekly maintenance cleaning service.",
    rating: 4.7,
    totalReviews: 180,
    provider: "Fresh & Clean Services"
  },
  {
    _id: "23",
    name: "Move-In/Move-Out Cleaning",
    category: "house_keeping",
    price: 50,
    priceType: "hour",
    description: "Thorough cleaning for moving in or out of a property.",
    rating: 4.9,
    totalReviews: 130,
    provider: "Swift Clean Solutions"
  },
  {
    _id: "24",
    name: "Carpet & Upholstery Cleaning",
    category: "house_keeping",
    price: 60,
    priceType: "service",
    description: "Professional carpet and furniture cleaning using eco-friendly products.",
    rating: 4.8,
    totalReviews: 100,
    provider: "Fabric Care Experts"
  },

  // LAUNDRY SERVICES
  {
    _id: "25",
    name: "Laundry & Dry Cleaning",
    category: "laundry",
    price: 25,
    priceType: "kg",
    description: "Professional laundry service with dry cleaning for delicate fabrics.",
    rating: 4.7,
    totalReviews: 160,
    provider: "LaundryHub Express"
  },
  {
    _id: "26",
    name: "Premium Fabric Care",
    category: "laundry",
    price: 35,
    priceType: "kg",
    description: "Premium laundry with special care for delicate and expensive fabrics.",
    rating: 4.9,
    totalReviews: 95,
    provider: "Elite Wash Services"
  },
  {
    _id: "27",
    name: "Commercial Laundry",
    category: "laundry",
    price: 40,
    priceType: "kg",
    description: "Bulk laundry services for hotels, hospitals, and businesses.",
    rating: 4.8,
    totalReviews: 110,
    provider: "BulkWash Pro"
  },
  {
    _id: "28",
    name: "Ironing & Pressing Service",
    category: "laundry",
    price: 30,
    priceType: "dozen",
    description: "Professional ironing and pressing for perfect results.",
    rating: 4.6,
    totalReviews: 140,
    provider: "Perfect Press Services"
  },

  // COURSES/TRAINING SERVICES
  {
    _id: "29",
    name: "Web Development Course",
    category: "courses",
    price: 50,
    priceType: "hour",
    description: "Learn HTML, CSS, JavaScript, and modern web frameworks.",
    rating: 4.9,
    totalReviews: 210,
    provider: "CodeMasters Academy"
  },
  {
    _id: "30",
    name: "Digital Marketing Bootcamp",
    category: "courses",
    price: 40,
    priceType: "hour",
    description: "Complete digital marketing strategy, SEO, and social media training.",
    rating: 4.8,
    totalReviews: 180,
    provider: "Digital Growth Institute"
  },
  {
    _id: "31",
    name: "English Language Classes",
    category: "courses",
    price: 30,
    priceType: "hour",
    description: "English speaking, grammar, and communication skills.",
    rating: 4.7,
    totalReviews: 250,
    provider: "Language Pro Academy"
  },
  {
    _id: "32",
    name: "Fitness & Yoga Training",
    category: "courses",
    price: 35,
    priceType: "hour",
    description: "Professional fitness coaching and yoga classes.",
    rating: 4.8,
    totalReviews: 195,
    provider: "FitLife Trainers"
  },

  // MUA (MAKEUP ARTIST) SERVICES
  {
    _id: "33",
    name: "Party Makeup & Styling",
    category: "mua",
    price: 60,
    priceType: "service",
    description: "Professional makeup for parties, events, and gatherings.",
    rating: 4.8,
    totalReviews: 170,
    provider: "Glam by Artist"
  },
  {
    _id: "34",
    name: "Bridal Makeup Package",
    category: "mua",
    price: 150,
    priceType: "service",
    description: "Complete bridal makeup with trials and touch-ups.",
    rating: 5.0,
    totalReviews: 160,
    provider: "Bride's Beauty Studio"
  },
  {
    _id: "35",
    name: "Special Effects Makeup",
    category: "mua",
    price: 100,
    priceType: "service",
    description: "Creative makeup for theater, film, and special events.",
    rating: 4.9,
    totalReviews: 85,
    provider: "FX Makeup Pro"
  },
  {
    _id: "36",
    name: "Eyebrow Threading & Design",
    category: "mua",
    price: 25,
    priceType: "service",
    description: "Perfect eyebrow threading and design services.",
    rating: 4.7,
    totalReviews: 140,
    provider: "Brow Perfect Studio"
  },

  // MECHANIC SERVICES
  {
    _id: "37",
    name: "General Car Servicing",
    category: "mechanic",
    price: 80,
    priceType: "service",
    description: "Regular maintenance, oil changes, and system checks.",
    rating: 4.8,
    totalReviews: 200,
    provider: "AutoCare Mechanics"
  },
  {
    _id: "38",
    name: "Engine Repair & Overhaul",
    category: "mechanic",
    price: 120,
    priceType: "hour",
    description: "Expert engine repair and complete overhaul services.",
    rating: 4.9,
    totalReviews: 110,
    provider: "Engine Specialists"
  },
  {
    _id: "39",
    name: "Brake & Suspension Service",
    category: "mechanic",
    price: 100,
    priceType: "service",
    description: "Brake inspection, repair, and suspension alignment.",
    rating: 4.7,
    totalReviews: 150,
    provider: "SafeStop Mechanics"
  },
  {
    _id: "40",
    name: "AC & Electrical Repairs",
    category: "mechanic",
    price: 70,
    priceType: "hour",
    description: "Car air conditioning and electrical system repairs.",
    rating: 4.6,
    totalReviews: 130,
    provider: "ElectroAuto Services"
  },

  // PLUMBER SERVICES
  {
    _id: "41",
    name: "Pipe Installation & Repair",
    category: "plumber",
    price: 55,
    priceType: "hour",
    description: "Complete plumbing installation and repair services.",
    rating: 4.8,
    totalReviews: 160,
    provider: "FlowRight Plumbers"
  },
  {
    _id: "42",
    name: "Bathroom Fixtures Installation",
    category: "plumber",
    price: 65,
    priceType: "hour",
    description: "Installation of sinks, taps, showers, and bathtubs.",
    rating: 4.7,
    totalReviews: 140,
    provider: "Fixture Masters"
  },
  {
    _id: "43",
    name: "Drainage & Sewage Services",
    category: "plumber",
    price: 70,
    priceType: "hour",
    description: "Drain cleaning, sewage line repair, and maintenance.",
    rating: 4.9,
    totalReviews: 125,
    provider: "DrainFlow Experts"
  },
  {
    _id: "44",
    name: "Water Tank Cleaning",
    category: "plumber",
    price: 60,
    priceType: "service",
    description: "Professional water tank cleaning and disinfection.",
    rating: 4.8,
    totalReviews: 110,
    provider: "Pure Water Cleaners"
  },

  // PAINTER SERVICES
  {
    _id: "45",
    name: "Interior Painting",
    category: "painter",
    price: 45,
    priceType: "sqft",
    description: "Professional interior wall painting with premium finishes.",
    rating: 4.8,
    totalReviews: 190,
    provider: "ColorBlend Painters"
  },
  {
    _id: "46",
    name: "Exterior Painting",
    category: "painter",
    price: 55,
    priceType: "sqft",
    description: "Durable exterior painting with weather-resistant paints.",
    rating: 4.7,
    totalReviews: 150,
    provider: "WeatherGuard Painters"
  },
  {
    _id: "47",
    name: "Wall Texturing & Design",
    category: "painter",
    price: 50,
    priceType: "sqft",
    description: "Creative wall textures and decorative painting designs.",
    rating: 4.9,
    totalReviews: 120,
    provider: "Artisan Paint Studio"
  },
  {
    _id: "48",
    name: "Wood & Metal Coating",
    category: "painter",
    price: 60,
    priceType: "hour",
    description: "Specialized coating for wood and metal surfaces.",
    rating: 4.6,
    totalReviews: 95,
    provider: "ProCoat Services"
  }
];

// Dummy orders for demo
const DUMMY_ORDERS = [
  {
    orderId: 'ORD-1704505200000',
    items: [
      {
        _id: "1",
        name: "Custom Furniture Making",
        category: "carpenter",
        price: 75,
        priceType: "hour",
        description: "Expert custom carpentry and furniture design",
        rating: 4.9,
        totalReviews: 120,
        provider: "Woodcraft Studio",
        hours: 8
      },
      {
        _id: "21",
        name: "Deep House Cleaning",
        category: "house_keeping",
        price: 40,
        priceType: "hour",
        description: "Complete deep cleaning of your entire home",
        rating: 4.8,
        totalReviews: 220,
        provider: "Clean Homes Pro",
        hours: 4
      }
    ],
    totalAmount: 760,
    totalHours: 12,
    status: 'completed',
    date: '12/28/2024',
    time: '10:30:45 AM',
    estimatedCompletion: '01/04/2025'
  },
  {
    orderId: 'ORD-1704678600000',
    items: [
      {
        _id: "13",
        name: "Residential Electrical Repair",
        category: "electrician",
        price: 60,
        priceType: "hour",
        description: "Licensed electrician for all home electrical repairs",
        rating: 4.9,
        totalReviews: 200,
        provider: "ElectroFix",
        hours: 3
      }
    ],
    totalAmount: 180,
    totalHours: 3,
    status: 'in-progress',
    date: '01/01/2025',
    time: '2:15:30 PM',
    estimatedCompletion: '01/08/2025'
  },
  {
    orderId: 'ORD-1704765000000',
    items: [
      {
        _id: "9",
        name: "Hair Cut & Styling",
        category: "salon",
        price: 30,
        priceType: "service",
        description: "Professional haircut and styling for all hair types",
        rating: 4.7,
        totalReviews: 200,
        provider: "Hair Haven Salon",
        hours: 1
      },
      {
        _id: "10",
        name: "Bridal Makeup & Hair",
        category: "salon",
        price: 150,
        priceType: "service",
        description: "Complete bridal packages with makeup, hair, and consultation",
        rating: 5.0,
        totalReviews: 180,
        provider: "Glamour Wedding Studio",
        hours: 2
      }
    ],
    totalAmount: 330,
    totalHours: 3,
    status: 'confirmed',
    date: '01/03/2025',
    time: '11:45:20 AM',
    estimatedCompletion: '01/10/2025'
  },
  {
    orderId: 'ORD-1704851400000',
    items: [
      {
        _id: "6",
        name: "Advanced Guitar Training",
        category: "guitarist",
        price: 80,
        priceType: "hour",
        description: "Advanced techniques, music theory, and professional-level instruction",
        rating: 5.0,
        totalReviews: 95,
        provider: "Guitar Masters",
        hours: 10
      }
    ],
    totalAmount: 800,
    totalHours: 10,
    status: 'confirmed',
    date: '01/05/2025',
    time: '3:30:15 PM',
    estimatedCompletion: '01/12/2025'
  },
  {
    orderId: 'ORD-1704937800000',
    items: [
      {
        _id: "37",
        name: "General Car Servicing",
        category: "mechanic",
        price: 80,
        priceType: "service",
        description: "Regular maintenance, oil changes, and system checks",
        rating: 4.8,
        totalReviews: 200,
        provider: "AutoCare Mechanics",
        hours: 2
      },
      {
        _id: "39",
        name: "Brake & Suspension Service",
        category: "mechanic",
        price: 100,
        priceType: "service",
        description: "Brake inspection, repair, and suspension alignment",
        rating: 4.7,
        totalReviews: 150,
        provider: "SafeStop Mechanics",
        hours: 3
      }
    ],
    totalAmount: 380,
    totalHours: 5,
    status: 'completed',
    date: '12/25/2024',
    time: '9:20:45 AM',
    estimatedCompletion: '01/01/2025'
  },
  {
    orderId: 'ORD-1705024200000',
    items: [
      {
        _id: "29",
        name: "Web Development Course",
        category: "courses",
        price: 50,
        priceType: "hour",
        description: "Learn HTML, CSS, JavaScript, and modern web frameworks",
        rating: 4.9,
        totalReviews: 210,
        provider: "CodeMasters Academy",
        hours: 5
      }
    ],
    totalAmount: 250,
    totalHours: 5,
    status: 'in-progress',
    date: '01/04/2025',
    time: '4:00:00 PM',
    estimatedCompletion: '01/11/2025'
  }
];

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState(DUMMY_ORDERS);
  const [services] = useState(DEMO_SERVICES);

  // Load from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    // Always initialize with dummy orders if nothing saved
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Set dummy orders for first load
      setOrders(DUMMY_ORDERS);
      localStorage.setItem('orders', JSON.stringify(DUMMY_ORDERS));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = useCallback((service, hours = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === service._id);
      if (existingItem) {
        return prevItems.map(item =>
          item._id === service._id
            ? { ...item, hours: item.hours + hours }
            : item
        );
      }
      return [...prevItems, { ...service, hours, cartItemId: Date.now() }];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
  }, []);

  const updateQuantity = useCallback((cartItemId, hours) => {
    if (hours <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, hours } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const checkout = useCallback(() => {
    if (cartItems.length === 0) return null;

    const orderId = 'ORD-' + Date.now();
    const newOrder = {
      orderId,
      items: cartItems,
      totalAmount: cartItems.reduce((sum, item) => sum + (item.price * item.hours), 0),
      totalHours: cartItems.reduce((sum, item) => sum + item.hours, 0),
      status: 'confirmed',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    return newOrder;
  }, [cartItems, clearCart]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    checkout,
    orders,
    services,
    cartTotal: cartItems.reduce((sum, item) => sum + (item.price * item.hours), 0),
    cartCount: cartItems.length
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
