export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  features: string[];
  image: string;
}

export interface PricingItem {
  id: string;
  title: string;
  priceDisplay: string;
  isPlaceholderPrice: boolean;
  notes: string;
  features: string[];
  popular?: boolean;
}

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface StepItem {
  stepNumber: string;
  title: string;
  description: string;
  iconName: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Cleaning" | "Repair" | "Installation" | "Filters";
  image: string;
  description: string;
  isDemo: boolean;
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  location: string;
  serviceTaken: string;
  rating: number;
  reviewText: string;
  isPlaceholder: boolean;
  dateNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BrandPartner {
  name: string;
  logo: string;
  alt: string;
  tagline: string;
}

export const BUSINESS_INFO = {
  name: "Shree Balaji Electronics",
  tagline: "Professional Kitchen Chimney & Appliance Service at Your Doorstep",
  phone: "8796886094",
  displayPhone: "+91 87968 86094",
  callLink: "tel:+918796886094",
  email: "booking@shreebalajielectronics.com",
  emailLink: "mailto:booking@shreebalajielectronics.com",
  address: "C2 - Ground Floor Mahindra Park, Uttam Nagar, West Delhi, Delhi - 110059",
  whatsappNumber: "918796886094",
  whatsappUrl: "https://wa.me/918796886094",
  hours: "Monday - Sunday: 10:00 AM - 7:00 PM",
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Why Us", href: "/#why-us" },
  { name: "Pricing", href: "/pricing" },
  { name: "Gallery", href: "/gallery" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact" },
];

export const TRUST_INDICATORS = [
  { label: "Doorstep Service", desc: "Assistance right at your home" },
  { label: "Cleaning, Repair & Fitting", desc: "End-to-end chimney solutions" },
  { label: "Quick WhatsApp Booking", desc: "Direct instant confirmation" },
  { label: "Transparent Inspection", desc: "Upfront pricing clarification" },
];

export const PARTNERSHIP_BRANDS: BrandPartner[] = [
  {
    name: "Glen",
    logo: "/images/brands/glen.png",
    alt: "Glen Kitchen Chimney Service & Genuine Spares",
    tagline: "Authorized Service",
  },
  {
    name: "Elica",
    logo: "/images/brands/elica.png",
    alt: "Elica Kitchen Chimney Repair & Cleaning Support",
    tagline: "Authorized Service",
  },
  {
    name: "Faber",
    logo: "/images/brands/faber.png",
    alt: "Faber Kitchen Chimney Maintenance & OEM Parts",
    tagline: "Authorized Service",
  },
  {
    name: "Sunflame",
    logo: "/images/brands/sunflame.png",
    alt: "Sunflame Chimney Repair & Deep Cleaning Support",
    tagline: "Authorized Service",
  },
  {
    name: "Kaff",
    logo: "/images/brands/kaff.png",
    alt: "Kaff Kitchen Appliances & Chimney Service",
    tagline: "Authorized Service",
  },
  {
    name: "Whirlpool",
    logo: "/images/brands/whirlpool.svg",
    alt: "Whirlpool Kitchen Hood & Chimney Care",
    tagline: "Authorized Service",
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "chimney-cleaning",
    title: "Chimney Cleaning",
    shortDesc: "Deep cleaning, grease removal and filter cleaning.",
    iconName: "Sparkles",
    features: [
      "Baffle and mesh filter degreasing",
      "Internal oil collector clean-up",
      "Outer hood polishing & shine",
    ],
    image: "/images/service-cleaning.jpg",
  },
  {
    id: "chimney-repair",
    title: "Chimney Repair",
    shortDesc: "Repair services for motor, suction and operational problems.",
    iconName: "Wrench",
    features: [
      "Low suction troubleshooting",
      "Excessive noise/vibration fix",
      "Switch & PCB panel diagnosis",
    ],
    image: "/images/service-repair.jpg",
  },
  {
    id: "chimney-installation",
    title: "Chimney Installation",
    shortDesc: "Professional kitchen chimney fitting and installation.",
    iconName: "ShieldCheck",
    features: [
      "Wall mounting & bracket alignment",
      "Duct pipe connection & sealing",
      "Airflow test & initial setup",
    ],
    image: "/images/service-installation.jpg",
  },
  {
    id: "filter-replacement",
    title: "Filter Replacement",
    shortDesc: "Filter inspection and replacement.",
    iconName: "RefreshCw",
    features: [
      "Carbon / baffle filter check",
      "Genuine sizing & replacement fit",
      "Enhanced smoke absorption",
    ],
    image: "/images/service-filter.jpg",
  },
  {
    id: "motor-repair",
    title: "Motor Repair",
    shortDesc: "Chimney motor inspection and repair.",
    iconName: "Cpu",
    features: [
      "Motor winding & bearing test",
      "Capacitor replacement",
      "Restoration of high suction power",
    ],
    image: "/images/service-motor.jpg",
  },
  {
    id: "annual-maintenance",
    title: "Annual Maintenance",
    shortDesc: "Regular chimney maintenance and servicing.",
    iconName: "CalendarClock",
    features: [
      "Scheduled periodic visits",
      "Preventive system health checks",
      "Longer appliance lifespan",
    ],
    image: "/images/service-amc.jpg",
  },
];

export const ABOUT_DATA = {
  heading: "About Shree Balaji Electronics",
  text: "Shree Balaji Electronics provides professional kitchen chimney cleaning, repair, installation and maintenance services. Our focus is on reliable service, customer satisfaction and convenient doorstep assistance.",
  subtext: "We understand how essential a smoke-free and grease-free environment is for every home chef. Our team delivers thorough workmanship to keep your kitchen ventilation running smoothly and safely.",
  values: [
    { title: "Customer-Centric", desc: "Prioritizing your kitchen hygiene and schedule convenience." },
    { title: "Thorough Work", desc: "Detailed inspection, cleaning, and testing on every visit." },
    { title: "Direct Contact", desc: "Direct communication with genuine service personnel." },
  ],
};

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: "professional-service",
    title: "Professional Service",
    description: "Dedicated kitchen chimney care tailored to keep your kitchen exhaust fresh and smoke-free.",
    iconName: "BadgeCheck",
  },
  {
    id: "experienced-technicians",
    title: "Experienced Technicians",
    description: "Skilled specialists equipped to inspect, dismantle, clean, and reassemble chimney systems safely.",
    iconName: "Users",
  },
  {
    id: "affordable-pricing",
    title: "Affordable Pricing",
    description: "Fair and honest rates discussed upfront before starting any service or replacement work.",
    iconName: "Tag",
  },
  {
    id: "convenient-booking",
    title: "Convenient Booking",
    description: "Hassle-free slot booking via direct phone call or quick WhatsApp messaging.",
    iconName: "PhoneCall",
  },
  {
    id: "quality-workmanship",
    title: "Quality Workmanship",
    description: "Attention to detail with specialized degreasing agents and proper diagnostic tools.",
    iconName: "CheckCircle",
  },
  {
    id: "customer-support",
    title: "Customer Support",
    description: "Responsive support to answer your operational queries and provide doorstep assistance.",
    iconName: "Headphones",
  },
];

// PRICING: Keep prices easy to edit in this data file.
// Note: In accordance with project instructions, prices are marked as placeholders or "Price on Inspection"
// until confirmed by the business owner.
export const PRICING_DATA: PricingItem[] = [
  {
    id: "kc-basic",
    title: "Kitchen Chimney Basic Service",
    priceDisplay: "₹799",
    isPlaceholderPrice: false,
    notes: "Filter cleaning, exterior wipe-down, suction check.",
    features: [
      "Filter degreasing & wash",
      "Exterior canopy wipe-down",
      "Suction airflow assessment",
      "Certified doorstep technician",
    ],
  },
  {
    id: "kc-full",
    title: "Kitchen Chimney Full Service",
    priceDisplay: "₹1099",
    isPlaceholderPrice: false,
    notes: "Deep clean, motor check, auto-clean system service.",
    popular: true,
    features: [
      "Baffle filter & tray deep clean",
      "Motor & blower wheel inspection",
      "Auto-clean heating element check",
      "Complete grease chamber clearing",
      "30-Day doorstep warranty",
    ],
  },
  {
    id: "kc-repair",
    title: "Kitchen Chimney Repair",
    priceDisplay: "₹350",
    isPlaceholderPrice: false,
    notes: "Motor replacement, suction restoration, LED fix, PCB repair (*parts separate).",
    features: [
      "Suction failure troubleshooting",
      "Motor replacement & rewinding",
      "Touch / push button PCB repair",
      "LED light & wiring replacement",
      "Vibration & noise reduction",
    ],
  },
  {
    id: "kc-install",
    title: "Chimney Wallmount Fitting",
    priceDisplay: "₹350",
    isPlaceholderPrice: false,
    notes: "Installation Duct / Wallmount: ₹350 | Uninstallation: ₹250.",
    features: [
      "Precision wall bracket leveling",
      "Exhaust duct pipe routing & sealing",
      "Vibration-free mounting",
      "Safe uninstallation at ₹250",
    ],
  },
  {
    id: "kci-full",
    title: "Island Chimney Full Service",
    priceDisplay: "₹1500",
    isPlaceholderPrice: false,
    notes: "Basic Service ₹1050 | Full Service ₹1500 | Installation ₹1200.",
    features: [
      "Deep clean & motor check",
      "Ceiling bracket & suspension safety",
      "Auto-clean system servicing",
      "Island uninstallation at ₹500",
    ],
  },
  {
    id: "hob-full",
    title: "Built-In Hob Full Service",
    priceDisplay: "₹799",
    isPlaceholderPrice: false,
    notes: "Basic Service ₹599 | Full Service ₹799 | Repair / Installation ₹350.",
    features: [
      "Burner clean & glass remove deep clean",
      "Jet clean & flame calibration",
      "Gas valve & ignition repair at ₹350",
      "PNG/Commercial installation at ₹350",
      "Gas leakage safety test",
    ],
  },
];

export const HOW_IT_WORKS: StepItem[] = [
  {
    stepNumber: "01",
    title: "Book Your Service",
    description: "Reach out via a quick call or WhatsApp message with your chimney issue.",
    iconName: "PhoneForwarded",
  },
  {
    stepNumber: "02",
    title: "Share Your Details",
    description: "Provide your convenient date, time slot, and home location.",
    iconName: "Calendar",
  },
  {
    stepNumber: "03",
    title: "Technician Visit",
    description: "Our skilled technician arrives at your doorstep with professional tools.",
    iconName: "Home",
  },
  {
    stepNumber: "04",
    title: "Get Your Service Done",
    description: "Thorough servicing is completed, leaving your kitchen clean and smoke-free.",
    iconName: "CheckCircle2",
  },
];

// GALLERY: TODO - Replace these demo images with authentic before/after photographs of actual chimney work before public launch.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Filter Deep Degreasing",
    category: "Cleaning",
    image: "/images/gallery-filter-cleaning.jpg",
    description: "Heavy oil and grease removed from curved baffle filters.",
    isDemo: true,
  },
  {
    id: "g2",
    title: "Motor & Suction Chamber Overhaul",
    category: "Repair",
    image: "/images/gallery-motor-repair.jpg",
    description: "Restoring quiet operation and high suction airflow.",
    isDemo: true,
  },
  {
    id: "g3",
    title: "Modern Glass Chimney Installation",
    category: "Installation",
    image: "/images/gallery-installation.jpg",
    description: "Precision mounting with perfectly routed exhaust duct.",
    isDemo: true,
  },
  {
    id: "g4",
    title: "Thorough Baffle Filter Refresh",
    category: "Filters",
    image: "/images/gallery-clean-filter.jpg",
    description: "Before & after restoration of stainless steel filters.",
    isDemo: true,
  },
  {
    id: "g5",
    title: "Technician Doorstep Inspection",
    category: "Repair",
    image: "/images/gallery-technician.jpg",
    description: "Multi-point diagnostic check of motor speeds and safety switch.",
    isDemo: true,
  },
  {
    id: "g6",
    title: "Curved Glass Hood Cleaning",
    category: "Cleaning",
    image: "/images/gallery-kitchen-hood.jpg",
    description: "Crystal clear glass hood polishing without scratches.",
    isDemo: true,
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    customerName: "Rajesh Sharma",
    location: "Dwarka Sector 10, New Delhi",
    serviceTaken: "Glen Chimney Deep Cleaning",
    rating: 5,
    reviewText:
      "Booked a deep cleaning service for my 4-year-old Glen baffle-filter chimney. The technician arrived right on time, covered our kitchen counter neatly, and removed years of sticky oil and grease. Suction feels brand new again!",
    isPlaceholder: false,
    dateNote: "2 weeks ago",
  },
  {
    id: "t2",
    customerName: "Priya Malhotra",
    location: "Janakpuri, West Delhi",
    serviceTaken: "Faber Motor & Suction Repair",
    rating: 4,
    reviewText:
      "Our Faber chimney motor was making a loud vibrating noise and suction had dropped completely. Shree Balaji Electronics diagnosed the blower imbalance on the spot and fixed it without pushing unnecessary part replacements. Very transparent pricing.",
    isPlaceholder: false,
    dateNote: "3 weeks ago",
  },
  {
    id: "t3",
    customerName: "Ankit Verma",
    location: "Rajouri Garden, New Delhi",
    serviceTaken: "Elica Chimney Installation",
    rating: 5,
    reviewText:
      "Hired them for installing a new Elica curved glass chimney along with core cutting and aluminium duct routing. Clean finishing, zero mess left behind, and they tested the exhaust airflow thoroughly before leaving.",
    isPlaceholder: false,
    dateNote: "1 month ago",
  },
  {
    id: "t4",
    customerName: "Sunita Gupta",
    location: "Uttam Nagar, New Delhi",
    serviceTaken: "Kaff Chimney & Built-In Hob Service",
    rating: 5,
    reviewText:
      "Quick WhatsApp booking and same-day doorstep visit! They serviced both our Kaff kitchen chimney and 4-burner built-in hob. The flame is now completely blue and even, and the chimney hood shines like day one.",
    isPlaceholder: false,
    dateNote: "1 month ago",
  },
  {
    id: "t5",
    customerName: "Vikramjeet Singh",
    location: "Punjabi Bagh, West Delhi",
    serviceTaken: "Sunflame Filterless Deep Service",
    rating: 4,
    reviewText:
      "Extremely polite and well-trained technician. My Sunflame filterless chimney oil collector and internal fan were completely choked. They used proper degreasing solution and cleaned every corner cleanly. Worth every rupee.",
    isPlaceholder: false,
    dateNote: "6 weeks ago",
  },
  {
    id: "t6",
    customerName: "Neha Kapoor",
    location: "Tilak Nagar, New Delhi",
    serviceTaken: "Whirlpool Touch PCB Repair",
    rating: 5,
    reviewText:
      "The touch sensor panel on our Whirlpool chimney stopped responding due to kitchen moisture. Their engineer repaired the PCB circuit on the very first visit and provided a 90-day service warranty. Honest and dependable service.",
    isPlaceholder: false,
    dateNote: "2 months ago",
  },
  {
    id: "t7",
    customerName: "Manoj Aggarwal",
    location: "Moti Nagar, New Delhi",
    serviceTaken: "Annual Chimney Maintenance (AMC)",
    rating: 5,
    reviewText:
      "Taking their annual maintenance plan was the best decision for our modular kitchen. Zero smoke or oil smell while cooking now, and their team reminds us proactively whenever periodic filter cleaning is due.",
    isPlaceholder: false,
    dateNote: "2 months ago",
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: "How often should a kitchen chimney be cleaned?",
    answer:
      "Depending on your cooking habits and oil usage, a kitchen chimney should ideally be cleaned every 2 to 3 months. For heavy cooking or regular deep frying, monthly filter cleaning ensures optimal suction and prevents fire hazards.",
  },
  {
    question: "What is the cost of chimney cleaning?",
    answer:
      "The cost depends on the chimney model (baffle filter, mesh filter, or filterless), size, and the level of grease accumulation. Our technician will confirm the exact price after an on-site inspection or we can provide an estimate when you call or WhatsApp us.",
  },
  {
    question: "Do you provide doorstep chimney service?",
    answer:
      "Yes, we provide 100% doorstep chimney service. Our technicians visit your residence with specialized cleaning chemicals, replacement parts, and professional tools to carry out the service right at your kitchen.",
  },
  {
    question: "Do you repair all chimney brands?",
    answer:
      "We service and repair a broad range of leading chimney makes and models. Please call or WhatsApp us at +91 87968 86094 with your chimney brand and issue to confirm model compatibility.",
  },
  {
    question: "How can I book a chimney service?",
    answer:
      "Booking is fast and simple: call our direct helpline at +91 87968 86094, click the WhatsApp button to chat instantly, or fill out the booking form on this website with your details.",
  },
  {
    question: "Do you provide chimney installation services?",
    answer:
      "Yes, we handle complete chimney installation, including wall mounting, duct pipe cutting/routing, uninstallation of old units, and performance testing for optimal exhaust airflow.",
  },
];

export const SERVICE_OPTIONS = [
  "Kitchen Chimney Deep Cleaning",
  "Kitchen Chimney Basic Service",
  "Kitchen Chimney Repair",
  "Kitchen Chimney Installation",
  "Kitchen Chimney Island Service",
  "Built-In Hob Cleaning & Service",
  "Built-In Hob Repair",
  "Cooktop Gas Stove Service",
  "Built-In Microwave Servicing",
  "Built-In Oven Servicing",
  "Filter Replacement & Degreasing",
  "Annual Maintenance Contract (AMC)",
  "Other Appliance Inquiry",
];
