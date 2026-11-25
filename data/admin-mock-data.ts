export interface BookingLead {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  serviceSlug: string;
  chimneyBrand: string;
  location: string;
  city: "Delhi" | "Noida" | "Gurgaon" | "Ghaziabad" | "Faridabad";
  date: string;
  timeSlot: string;
  quotedPrice: number;
  status: "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  assignedTech: string;
  paymentStatus: "Unpaid" | "Paid Online" | "Cash on Doorstep";
  notes?: string;
  createdAt: string;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  specialty: string;
  assignedArea: string;
  status: "Available" | "On Doorstep Job" | "In Transit" | "Off Duty";
  rating: number;
  completedJobs: number;
  experienceYears: number;
}

export interface AdminServiceItem {
  id: string;
  slug: string;
  title: string;
  basePrice: number;
  priceDisplay: string;
  estimatedDuration: string;
  isActive: boolean;
  totalBookings: number;
  badge: string;
}

export const INITIAL_BOOKINGS: BookingLead[] = [
  {
    id: "RKS-1042",
    customerName: "Pooja Malhotra",
    phone: "+91 98112 34567",
    service: "Kitchen Chimney Deep Cleaning",
    serviceSlug: "deep-cleaning",
    chimneyBrand: "Faber (Auto-Clean 90cm)",
    location: "Sector 50, Nirvana Country",
    city: "Gurgaon",
    date: "Today, Nov 23",
    timeSlot: "11:00 AM - 01:00 PM",
    quotedPrice: 999,
    status: "In Progress",
    assignedTech: "Sunil Kumar",
    paymentStatus: "Unpaid",
    notes: "Heavy oil dripping from oil cup. Customer requested caustic-free wash.",
    createdAt: "2026-11-23T04:30:00Z",
  },
  {
    id: "RKS-1041",
    customerName: "Vikram Singhania",
    phone: "+91 98710 88234",
    service: "Chimney Repair & Diagnostics",
    serviceSlug: "repair-diagnostics",
    chimneyBrand: "Elica (Spot 60cm)",
    location: "Pocket B, Mayur Vihar Phase 2",
    city: "Delhi",
    date: "Today, Nov 23",
    timeSlot: "02:30 PM - 04:30 PM",
    quotedPrice: 650,
    status: "Confirmed",
    assignedTech: "Rajesh Verma",
    paymentStatus: "Unpaid",
    notes: "Loud humming noise when motor runs on speed 3.",
    createdAt: "2026-11-23T05:15:00Z",
  },
  {
    id: "RKS-1040",
    customerName: "Dr. Alok Srivastava",
    phone: "+91 99104 55678",
    service: "Professional Chimney Installation",
    serviceSlug: "installation-uninstallation",
    chimneyBrand: "Glen (Curved Glass 60cm)",
    location: "Sector 62, Stellar Park",
    city: "Noida",
    date: "Today, Nov 23",
    timeSlot: "04:30 PM - 06:30 PM",
    quotedPrice: 799,
    status: "Pending",
    assignedTech: "Imran Khan",
    paymentStatus: "Unpaid",
    notes: "New modular kitchen setup. 6-inch flexible aluminium duct pipe required.",
    createdAt: "2026-11-23T06:00:00Z",
  },
  {
    id: "RKS-1039",
    customerName: "Ananya Deshmukh",
    phone: "+91 98188 44123",
    service: "Baffle & Carbon Filter Replacement",
    serviceSlug: "filter-replacement",
    chimneyBrand: "Hindware (Inverness)",
    location: "Nyay Khand 1, Indirapuram",
    city: "Ghaziabad",
    date: "Today, Nov 23",
    timeSlot: "10:00 AM - 11:30 AM",
    quotedPrice: 850,
    status: "Completed",
    assignedTech: "Amit Sharma",
    paymentStatus: "Paid Online",
    notes: "Both baffle filters replaced with genuine OEM stainless steel filters.",
    createdAt: "2026-11-23T03:10:00Z",
  },
  {
    id: "RKS-1038",
    customerName: "Karan Johar Mehra",
    phone: "+91 97119 22345",
    service: "Motor Repair & Rewinding",
    serviceSlug: "motor-repair",
    chimneyBrand: "Kaff (Castor DHC)",
    location: "Greater Kailash 1, M-Block",
    city: "Delhi",
    date: "Yesterday, Nov 22",
    timeSlot: "03:00 PM - 05:00 PM",
    quotedPrice: 1450,
    status: "Completed",
    assignedTech: "Sunil Kumar",
    paymentStatus: "Cash on Doorstep",
    notes: "Copper winding repaired, new 4uF capacitor installed. 30-day warranty card handed over.",
    createdAt: "2026-11-22T09:40:00Z",
  },
  {
    id: "RKS-1037",
    customerName: "Neha Aggarwal",
    phone: "+91 99990 12389",
    service: "Annual Maintenance Contract (AMC)",
    serviceSlug: "annual-maintenance",
    chimneyBrand: "Faber (Primus Plus)",
    location: "Sector 14, Old Faridabad",
    city: "Faridabad",
    date: "Yesterday, Nov 22",
    timeSlot: "01:00 PM - 03:00 PM",
    quotedPrice: 1899,
    status: "Completed",
    assignedTech: "Vikram Singh",
    paymentStatus: "Paid Online",
    notes: "1-Year AMC booked (3 scheduled deep cleans + unlimited breakdown visits).",
    createdAt: "2026-11-22T07:20:00Z",
  },
  {
    id: "RKS-1036",
    customerName: "Rajeev Goel",
    phone: "+91 98101 77654",
    service: "Kitchen Chimney Deep Cleaning",
    serviceSlug: "deep-cleaning",
    chimneyBrand: "Elica (Strip BF 60)",
    location: "Vasant Vihar, Block E",
    city: "Delhi",
    date: "Nov 21",
    timeSlot: "11:00 AM - 01:00 PM",
    quotedPrice: 999,
    status: "Completed",
    assignedTech: "Rajesh Verma",
    paymentStatus: "Cash on Doorstep",
    notes: "Satisfied customer, gave 5-star review.",
    createdAt: "2026-11-21T06:00:00Z",
  },
];

export const INITIAL_TECHNICIANS: Technician[] = [
  {
    id: "TECH-01",
    name: "Sunil Kumar",
    phone: "+91 98115 11001",
    specialty: "Motor Rewinding, PCB Diagnostics & Multi-brand",
    assignedArea: "Gurgaon & Dwarka",
    status: "On Doorstep Job",
    rating: 4.95,
    completedJobs: 412,
    experienceYears: 8,
  },
  {
    id: "TECH-02",
    name: "Rajesh Verma",
    phone: "+91 98115 11002",
    specialty: "Deep Degreasing & Duct Mounting",
    assignedArea: "South Delhi & Noida",
    status: "Available",
    rating: 4.92,
    completedJobs: 384,
    experienceYears: 6,
  },
  {
    id: "TECH-03",
    name: "Amit Sharma",
    phone: "+91 98115 11003",
    specialty: "Ultrasonic Filter Cleaning & Chemical Free Wash",
    assignedArea: "Ghaziabad & East Delhi",
    status: "Available",
    rating: 4.88,
    completedJobs: 295,
    experienceYears: 5,
  },
  {
    id: "TECH-04",
    name: "Imran Khan",
    phone: "+91 98115 11004",
    specialty: "Precision Bracket Fitting & Core Cutting",
    assignedArea: "North & West Delhi",
    status: "In Transit",
    rating: 4.91,
    completedJobs: 330,
    experienceYears: 7,
  },
  {
    id: "TECH-05",
    name: "Vikram Singh",
    phone: "+91 98115 11005",
    specialty: "AMC Inspections & Airflow Velocity Tuning",
    assignedArea: "Faridabad & Greater Noida",
    status: "Available",
    rating: 4.96,
    completedJobs: 440,
    experienceYears: 9,
  },
];

export const INITIAL_ADMIN_SERVICES: AdminServiceItem[] = [
  {
    id: "SRV-01",
    slug: "deep-cleaning",
    title: "Kitchen Chimney Deep Cleaning & Degreasing",
    basePrice: 999,
    priceDisplay: "Starting at ₹999",
    estimatedDuration: "45 – 60 Minutes",
    isActive: true,
    totalBookings: 642,
    badge: "Most Requested",
  },
  {
    id: "SRV-02",
    slug: "repair-diagnostics",
    title: "Chimney Repair & Fault Diagnostics",
    basePrice: 499,
    priceDisplay: "Inspection at ₹499 (Free on Repair)",
    estimatedDuration: "30 – 45 Minutes",
    isActive: true,
    totalBookings: 388,
    badge: "Same-Day Slot",
  },
  {
    id: "SRV-03",
    slug: "installation-uninstallation",
    title: "Professional Chimney Installation & Fitting",
    basePrice: 799,
    priceDisplay: "Starting at ₹799",
    estimatedDuration: "60 – 90 Minutes",
    isActive: true,
    totalBookings: 275,
    badge: "Laser Alignment",
  },
  {
    id: "SRV-04",
    slug: "filter-replacement",
    title: "Baffle & Carbon Filter Replacement",
    basePrice: 449,
    priceDisplay: "Starting at ₹449",
    estimatedDuration: "20 – 30 Minutes",
    isActive: true,
    totalBookings: 198,
    badge: "100% OEM Spares",
  },
  {
    id: "SRV-05",
    slug: "motor-repair",
    title: "Chimney Motor Repair & Rewinding",
    basePrice: 1299,
    priceDisplay: "Starting at ₹1,299",
    estimatedDuration: "60 – 120 Minutes",
    isActive: true,
    totalBookings: 164,
    badge: "30-Day Guarantee",
  },
  {
    id: "SRV-06",
    slug: "annual-maintenance",
    title: "Annual Maintenance Contract (AMC)",
    basePrice: 1899,
    priceDisplay: "Plans from ₹1,899 / Year",
    estimatedDuration: "Year-Round Doorstep Protection",
    isActive: true,
    totalBookings: 121,
    badge: "Zero Downtime",
  },
];
