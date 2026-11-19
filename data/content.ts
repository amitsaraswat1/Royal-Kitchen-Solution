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
  reviewText: string;
  isPlaceholder: boolean;
  dateNote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: "Royal Kitchen Solution",
  tagline: "Professional Kitchen Chimney Service at Your Doorstep",
  phone: "7011546526",
  displayPhone: "+91 70115 46526",
  callLink: "tel:+917011546526",
  email: "info@Royalkitchensolution.com",
  emailLink: "mailto:info@Royalkitchensolution.com",
  whatsappNumber: "917011546526",
  whatsappUrl: "https://wa.me/917011546526",
  hours: "Monday - Sunday: 9:00 AM - 8:00 PM",
};

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Why Us", href: "#why-us" },
  { name: "Pricing", href: "#pricing" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Gallery", href: "#gallery" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const TRUST_INDICATORS = [
  { label: "Doorstep Service", desc: "Assistance right at your home" },
  { label: "Cleaning, Repair & Fitting", desc: "End-to-end chimney solutions" },
  { label: "Quick WhatsApp Booking", desc: "Direct instant confirmation" },
  { label: "Transparent Inspection", desc: "Upfront pricing clarification" },
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
  heading: "About Royal Kitchen Solution",
  text: "Royal Kitchen Solution provides professional kitchen chimney cleaning, repair, installation and maintenance services. Our focus is on reliable service, customer satisfaction and convenient doorstep assistance.",
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
    id: "inspection",
    title: "Chimney Inspection",
    priceDisplay: "Price on Inspection",
    isPlaceholderPrice: true,
    notes: "Complete diagnosis of suction, motor, and electrical components.",
    features: [
      "Overall health checkup",
      "Suction power assessment",
      "Upfront quote before repair",
    ],
  },
  {
    id: "deep-cleaning",
    title: "Chimney Deep Cleaning",
    priceDisplay: "Starting at ₹999",
    isPlaceholderPrice: false,
    notes: "Complete deep cleaning of filters, baffle plates, and oil collector.",
    popular: true,
    features: [
      "Filters & baffle degreasing",
      "Oil collector thorough wash",
      "Exterior & motor housing wipe",
      "Airflow test after cleaning",
    ],
  },
  {
    id: "repair",
    title: "Chimney Repair",
    priceDisplay: "Price on Inspection",
    isPlaceholderPrice: true,
    notes: "Diagnosed on doorstep; rate depends on faulty parts or issue.",
    features: [
      "Suction failure troubleshooting",
      "Touch / push button repair",
      "Strange noise / vibration fix",
    ],
  },
  {
    id: "installation",
    title: "Chimney Installation",
    priceDisplay: "Starting at ₹___",
    isPlaceholderPrice: true,
    notes: "Placeholder rate - depends on duct length & wall type.",
    features: [
      "Safe wall mount installation",
      "Exhaust duct fitting & sealing",
      "Vibration dampening alignment",
    ],
  },
  {
    id: "filter-replacement",
    title: "Filter Replacement",
    priceDisplay: "Price on Inspection",
    isPlaceholderPrice: true,
    notes: "Depends on filter type (baffle, mesh, carbon) and brand model.",
    features: [
      "Correct size identification",
      "Fresh filter fitting",
      "Old filter disposal assistance",
    ],
  },
  {
    id: "motor-repair",
    title: "Motor Repair",
    priceDisplay: "Price on Inspection",
    isPlaceholderPrice: true,
    notes: "Comprehensive motor diagnostic & rewinding/capacitor support.",
    features: [
      "Motor coil & thermal check",
      "Bearing lubrication/fix",
      "Suction speed restoration",
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

// TESTIMONIALS: Real customer reviews array.
// Per project instructions: "Use clearly marked placeholder content ('Placeholder review: replace before launch'), no fake names or star ratings. Hide the section automatically if the array is empty."
// Set this array to empty `[]` if no reviews are available yet.
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    customerName: "Placeholder: Verified Customer A",
    reviewText: "Placeholder review: replace before launch with authentic customer feedback regarding chimney deep cleaning and prompt technician visit.",
    isPlaceholder: true,
    dateNote: "Placeholder Entry",
  },
  {
    id: "t2",
    customerName: "Placeholder: Verified Customer B",
    reviewText: "Placeholder review: replace before launch with genuine feedback regarding motor suction repair and doorstep convenience.",
    isPlaceholder: true,
    dateNote: "Placeholder Entry",
  },
  {
    id: "t3",
    customerName: "Placeholder: Verified Customer C",
    reviewText: "Placeholder review: replace before launch with customer feedback on chimney installation and clean finishing.",
    isPlaceholder: true,
    dateNote: "Placeholder Entry",
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
      "We service and repair a broad range of leading chimney makes and models. Please call or WhatsApp us at 7011546526 with your chimney brand and issue to confirm model compatibility.",
  },
  {
    question: "How can I book a chimney service?",
    answer:
      "Booking is fast and simple: call our direct helpline at 7011546526, click the WhatsApp button to chat instantly, or fill out the booking form on this website with your details.",
  },
  {
    question: "Do you provide chimney installation services?",
    answer:
      "Yes, we handle complete chimney installation, including wall mounting, duct pipe cutting/routing, uninstallation of old units, and performance testing for optimal exhaust airflow.",
  },
];

export const SERVICE_OPTIONS = [
  "Chimney Cleaning",
  "Chimney Repair",
  "Chimney Installation",
  "Filter Replacement",
  "Motor Repair",
  "Annual Maintenance",
];
