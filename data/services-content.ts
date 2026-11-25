export interface DetailedService {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  duration: string;
  recommendedFrequency: string;
  priceDisplay: string;
  image: string;
  iconName: string;
  overview: string;
  procedure: {
    step: string;
    description: string;
  }[];
  symptoms: string[];
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  guarantee: string;
}

export interface ServicePlanComparison {
  feature: string;
  standardClean: boolean | string;
  deepClean: boolean | string;
  annualAmc: boolean | string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export const DETAILED_SERVICES: DetailedService[] = [
  {
    id: "chimney-deep-cleaning",
    slug: "deep-cleaning",
    title: "Kitchen Chimney Deep Cleaning & Degreasing",
    tagline: "Heavy-duty caustic-free degreasing of filters, blower wheel, oil collector & internal chambers.",
    badge: "Most Requested",
    duration: "45 – 60 Minutes",
    recommendedFrequency: "Every 2 – 3 Months for Indian Cooking",
    priceDisplay: "Starting at ₹999",
    image: "/images/service-cleaning.jpg",
    iconName: "Sparkles",
    overview:
      "Indian cooking involves rich oils, aromatic spices, and high-heat tadkas that generate thick airborne grease. Over weeks of cooking, this grease condenses on baffle filters, coats the internal blower fan, and clogs the oil tray. Our deep cleaning service completely strips away stubborn solidified oil without abrasive tools or toxic caustic soda, restoring 100% suction efficiency and preventing fire hazards.",
    procedure: [
      {
        step: "1. Area Preparation & Safety Check",
        description: "Electrical power isolation, countertop covering, and safety shielding of your cooktop and kitchen tiles.",
      },
      {
        step: "2. Precision Filter & Tray Disassembly",
        description: "Careful removal of stainless steel baffle plates, mesh filters, locking latches, and internal oil collector tray.",
      },
      {
        step: "3. Intensive Degreasing Immersion",
        description: "Filters soaked in an eco-safe, non-corrosive degreasing solution to dissolve carbonized oil layers.",
      },
      {
        step: "4. Blower Fan & Housing Scrubbing",
        description: "Motor blower rotor carefully wiped and degreased to remove sticky residue without disturbing fan balance.",
      },
      {
        step: "5. Internal Chamber & Duct Mouth Wipe",
        description: "Internal grease cavity thoroughly degreased and cleaned, clearing the passage for unhindered exhaust airflow.",
      },
      {
        step: "6. Reassembly & Airflow Velocity Testing",
        description: "Components dried, reassembled, outer hood polished with stainless-steel restorer, and suction tested.",
      },
    ],
    symptoms: [
      "Oil droplets leaking from chimney edges onto the stove",
      "Kitchen filled with smoke or strong pungent smell during tadka",
      "Persistent greasy yellow layer on cabinet doors and ceiling",
      "Chimney suction feels noticeably weaker than when installed",
      "Filters feel extremely sticky to the touch and airflow is choked",
    ],
    whatsIncluded: [
      "Baffle plates & mesh filters degreasing",
      "Oil collector cup / tray hot wash",
      "Motor blower wheel surface wipe",
      "Internal suction chamber clearing",
      "Exterior stainless steel / glass polishing",
      "Airflow test & post-service cleanup",
    ],
    whatsNotIncluded: [
      "Motor replacement or electrical rewiring (quoted separately if needed)",
      "New duct pipe replacement (available as add-on)",
    ],
    guarantee: "30-Day Doorstep Service Guarantee",
  },
  {
    id: "chimney-repair-diagnostics",
    slug: "repair-diagnostics",
    title: "Chimney Repair & Fault Diagnostics",
    tagline: "Doorstep diagnostic and precision repair for low suction, strange noises, PCB issues & motor faults.",
    badge: "Fast Doorstep Help",
    duration: "30 – 60 Minutes",
    recommendedFrequency: "As needed upon unusual symptoms",
    priceDisplay: "Price on Inspection",
    image: "/images/service-repair.jpg",
    iconName: "Wrench",
    overview:
      "If your kitchen chimney is humming loudly, vibrating, shutting down abruptly, or the touch controls are completely dead, our experienced diagnostic technicians carry professional multimeters and tools to identify the exact point of failure. We diagnose motor capacitor issues, touch PCB board faults, wiring short circuits, and damaged blower blades on-site with transparent upfront pricing before touching any part.",
    procedure: [
      {
        step: "1. Acoustic & Vibration Inspection",
        description: "Testing motor noise across all 3 speed gears to identify worn bearings, blower imbalance, or loose mounting.",
      },
      {
        step: "2. Electrical Continuity & Voltage Test",
        description: "Multimeter testing of main PCB board, power supply switch, capacitive touch sensors, and safety cutoffs.",
      },
      {
        step: "3. Motor & Capacitor Assessment",
        description: "Checking microfarad (µF) rating of start/run capacitor and measuring copper motor coil resistance.",
      },
      {
        step: "4. Transparent Doorstep Quote",
        description: "Explaining the root cause directly to you with clear part pricing before starting any repair work.",
      },
      {
        step: "5. Genuine Component Replacement",
        description: "Fitting 100% compatible OEM-grade switches, PCBs, capacitors, or wiring harnesses.",
      },
      {
        step: "6. Load & Suction Verification",
        description: "Running the chimney under continuous load to ensure stable operation and zero abnormal vibration.",
      },
    ],
    symptoms: [
      "Loud rattling, grinding, or screeching sound from the motor",
      "Touch screen or push buttons completely unresponsive",
      "Motor hums when switched on but the fan does not spin",
      "Chimney trips the MCB / kitchen circuit breaker when turned on",
      "Halogen or LED lights are dead or flickering continuously",
    ],
    whatsIncluded: [
      "Complete electrical and mechanical diagnosis",
      "PCB panel moisture drying and contact cleaning",
      "Capacitor check and connection tightening",
      "Switch board and sensor calibration",
      "Upfront quote with zero hidden charges",
    ],
    whatsNotIncluded: [
      "Cost of new replacement hardware components (billed at honest rates)",
    ],
    guarantee: "30-Day Warranty on Replaced Spare Parts",
  },
  {
    id: "chimney-installation-uninstallation",
    slug: "installation-uninstallation",
    title: "Professional Chimney Installation & Fitting",
    tagline: "Laser-aligned wall mounting, core-cutting coordination, duct pipe routing & vibration-free setup.",
    badge: "Expert Mounting",
    duration: "60 – 90 Minutes",
    recommendedFrequency: "For new kitchens, renovations & relocation",
    priceDisplay: "Standard Fitting Rates",
    image: "/images/service-installation.jpg",
    iconName: "ShieldCheck",
    overview:
      "A kitchen chimney’s suction power is only as good as its installation. Mounting it too high reduces suction; mounting it too low risks fire or head-bumps. Bends in the duct pipe choke airflow and create loud backpressure noise. Our technicians calculate the precise 65cm–75cm clearance from your gas burner, route the duct with minimum bends, install exterior cowls to keep birds and rain out, and seal joints with heat-resistant foil tape.",
    procedure: [
      {
        step: "1. Wall Measurement & Laser Leveling",
        description: "Determining optimal height (65–75 cm above hob) and marking drill points with precision spirit levels.",
      },
      {
        step: "2. Heavy-Duty Bracket Fastening",
        description: "Installing industrial rawl plugs and mounting plates to support full unit weight without sagging.",
      },
      {
        step: "3. Chimney Unit Securing",
        description: "Locking the chimney body onto brackets and verifying firm, vibration-damped wall attachment.",
      },
      {
        step: "4. Duct Pipe Routing & Connection",
        description: "Fitting 6-inch flexible or rigid aluminum exhaust ducting with smooth gentle bends for max airflow.",
      },
      {
        step: "5. Exterior Cowl / Louver Installation",
        description: "Sealing external wall outlet with weather-proof louver cover to block bird entry, insects, and rainwater.",
      },
      {
        step: "6. Joint Sealing & Air Leakage Test",
        description: "Sealing all seams with high-temp aluminum foil tape and verifying zero backflow or air whistling.",
      },
    ],
    symptoms: [
      "Purchased a new chimney online or from an appliance showroom",
      "Moving to a new rental house or apartment and need safe shifting",
      "Existing chimney shakes or rattles due to loose wall screws",
      "Duct pipe has torn or disconnected, blowing oil fumes inside cabinet",
      "Backdraft valve is jammed, letting outside dust enter the kitchen",
    ],
    whatsIncluded: [
      "Precision wall bracket mounting & leveling",
      "Duct pipe connection to chimney exhaust collar",
      "Joint sealing with aluminum foil tape",
      "Exterior exhaust louver/cowl cover fitting",
      "Initial speed check & suction validation",
    ],
    whatsNotIncluded: [
      "Civil masonry / 6-inch wall core cutting (coordinated on request)",
      "Cost of extra flexible aluminum duct pipe or cowl (available with tech)",
    ],
    guarantee: "100% Vibration-Free Mounting Guarantee",
  },
  {
    id: "filter-cleaning-replacement",
    slug: "filter-replacement",
    title: "Baffle & Charcoal Filter Replacement",
    tagline: "Genuine stainless steel baffle filters, 3D filters & activated carbon cassettes for all models.",
    badge: "Clean Airflow",
    duration: "30 – 40 Minutes",
    recommendedFrequency: "Charcoal filters every 4 – 6 Months; Baffle check annually",
    priceDisplay: "Honest Part Rates",
    image: "/images/service-filter.jpg",
    iconName: "RefreshCw",
    overview:
      "Filters are the first line of defense for your chimney. Stainless steel baffle filters use the cut-and-chop principle to separate heavy oil from hot smoke. In ductless / recycling chimneys, activated carbon charcoal filters absorb pungent cooking smells. Over time, physical damage, rusted edges, or saturated carbon pellets drastically reduce your kitchen’s air quality. We provide original-fit replacements for every major chimney brand.",
    procedure: [
      {
        step: "1. Filter Condition & Dimension Audit",
        description: "Measuring exact frame dimensions (length, width, latch type) to ensure an airtight OEM fit.",
      },
      {
        step: "2. Deep Degreasing or Safe Disposal",
        description: "Ultrasonic or specialized degreasing bath for reusable baffles; eco-friendly disposal for expired carbon pads.",
      },
      {
        step: "3. Genuine Replacement Sizing",
        description: "Fitting grade-304 stainless steel baffle filters or high-density microporous activated carbon cassettes.",
      },
      {
        step: "4. Latch & Lock Mechanism Adjustment",
        description: "Aligning spring latches and quick-release buttons so filters sit flush without rattling.",
      },
      {
        step: "5. Smoke Draw Verification",
        description: "Validating balanced suction across the entire filter perimeter with zero bypass leakage.",
      },
    ],
    symptoms: [
      "Filters are dented, bent, or latch is broken causing filter to drop",
      "Persistent greasy smell even though the chimney fan runs on high",
      "Charcoal filters have not been changed for more than 6 months",
      "Baffle plates have developed rust spots or stubborn black grease crust",
    ],
    whatsIncluded: [
      "Complete filter inspection & sizing guidance",
      "Original-spec stainless steel or carbon filter fitting",
      "Filter lock and spring latch servicing",
      "Oil collector alignment and seal test",
    ],
    whatsNotIncluded: [
      "Hardware cost of brand-new replacement filters (priced upfront)",
    ],
    guarantee: "Genuine Fit & Compatibility Assurance",
  },
  {
    id: "motor-repair-rewinding",
    slug: "motor-repair",
    title: "Chimney Motor Repair & Winding",
    tagline: "Heavy-duty copper winding, precision sealed bearing replacement & capacitor tuning.",
    badge: "Core Performance",
    duration: "60 – 90 Minutes",
    recommendedFrequency: "Whenever motor exhibits sluggish start or noise",
    priceDisplay: "Quote on Motor Health",
    image: "/images/service-motor.jpg",
    iconName: "Cpu",
    overview:
      "The motor is the heart of your kitchen chimney. Running a chimney with heavily grease-choked filters forces the motor to draw extra amps, overheating the copper coils and burning out the start capacitor. Our specialized motor technicians service copper stators, replace squeaking dry bearings with high-temperature sealed ball bearings, and recalibrate Thermal Overload Protectors (TOP) to restore factory-grade 1200+ m³/hr suction.",
    procedure: [
      {
        step: "1. Motor Extraction & Disassembly",
        description: "Safely unbolting the sealed motor housing from the blower assembly without damaging delicate fan blades.",
      },
      {
        step: "2. Stator & Winding Continuity Test",
        description: "Ohmic resistance testing of primary and auxiliary windings to detect shorted or burnt coils.",
      },
      {
        step: "3. Sealed Ball Bearing Replacement",
        description: "Pulling dry, seized bearings and installing heavy-duty double-shielded ball bearings for whisper-quiet rotation.",
      },
      {
        step: "4. Run Capacitor Calibration",
        description: "Testing microfarad value and installing high-temperature AC motor capacitors for instant start torque.",
      },
      {
        step: "5. Blower Dynamic Wheel Balancing",
        description: "Centering the centrifugal impeller wheel on the motor shaft to eliminate high-speed wobble.",
      },
      {
        step: "6. Thermal Safety Audit",
        description: "Verifying thermal cutout trigger so the motor shuts down safely if ambient duct temperatures spike.",
      },
    ],
    symptoms: [
      "Motor emits a loud humming sound but impeller wheel does not rotate",
      "Noticeable burning electrical smell coming through the chimney hood",
      "Drastic loss in suction power despite completely clean filters",
      "Excessive vibration rattling the entire glass canopy on high speed",
      "Motor abruptly stops running after 5 to 10 minutes of operation",
    ],
    whatsIncluded: [
      "Motor dismantling, degreasing, and bearing lubrication",
      "Motor capacitor test and replacement if weak",
      "Shaft alignment and impeller balancing",
      "Electrical wiring terminal restoration",
    ],
    whatsNotIncluded: [
      "Full motor unit replacement if stator is completely burnt beyond rewinding",
    ],
    guarantee: "30-Day Doorstep Service Warranty",
  },
  {
    id: "annual-maintenance-contract",
    slug: "annual-maintenance",
    title: "Annual Maintenance Contract (AMC Plans)",
    tagline: "Year-round preventive care, scheduled deep cleaning visits & priority breakdown protection.",
    badge: "Best Value Plan",
    duration: "Full Year Coverage",
    recommendedFrequency: "Annual Subscription (Renewable)",
    priceDisplay: "Custom Packages Available",
    image: "/images/service-amc.jpg",
    iconName: "CalendarClock",
    overview:
      "A kitchen chimney is an essential daily appliance. Without scheduled preventive maintenance, motor efficiency drops by 30% each year, oil drips ruin expensive modular cabinets, and sudden breakdowns leave your kitchen choked with smoke during important family dinners. Our Royal Kitchen AMC plans provide scheduled quarterly deep cleanings, unlimited free breakdown visits, and zero labour charges for an entire year.",
    procedure: [
      {
        step: "1. Comprehensive Baseline Health Audit",
        description: "Full inspection of motor, suction velocity, electrical PCB, duct integrity, and filter condition on day one.",
      },
      {
        step: "2. Scheduled Deep Servicing Visits",
        description: "Quarterly or bi-annual proactive visits where our technician automatically arrives for deep cleaning.",
      },
      {
        step: "3. Unlimited Priority Breakdown Support",
        description: "Fast-track response within 24 hours whenever your chimney faces operational or electrical trouble.",
      },
      {
        step: "4. Zero Labour Charges on Repairs",
        description: "No service visit charge or diagnostic fee for any repair during the active contract period.",
      },
      {
        step: "5. Periodic Suction Calibration",
        description: "Ongoing airflow measurements ensuring your chimney operates at optimal smoke extraction efficiency.",
      },
    ],
    symptoms: [
      "You cook daily with deep frying, non-veg gravies, or heavy tadkas",
      "You want hassle-free kitchen hygiene without remembering service dates",
      "Protecting expensive designer chimney models (Faber, Elica, Bosch, Glen)",
      "Eliminating sudden expensive repair costs with predictable care",
    ],
    whatsIncluded: [
      "Scheduled deep cleaning visits per year (2 or 3 visits)",
      "Free unlimited breakdown callouts throughout the year",
      "Zero labour / visiting charges for any repairs",
      "Priority same-day technician dispatch",
      "Discounted rates on genuine replacement spare parts",
    ],
    whatsNotIncluded: [
      "Cost of external physical damage or glass canopy breakage",
    ],
    guarantee: "100% Uptime & Satisfaction Guarantee",
  },
];

export const SERVICE_COMPARISON_PLANS: ServicePlanComparison[] = [
  {
    feature: "Filter & Baffle Degreasing",
    standardClean: true,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "Oil Collector Cup Wash",
    standardClean: true,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "Internal Grease Chamber Clearing",
    standardClean: "Basic Wipe",
    deepClean: "Deep Scrub & Wash",
    annualAmc: "Deep Scrub & Wash",
  },
  {
    feature: "Blower Fan & Housing Degreasing",
    standardClean: false,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "Motor & Bearing Inspection",
    standardClean: false,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "PCB Board & Switch Diagnosis",
    standardClean: false,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "Outer Canopy Polish (Stainless/Glass)",
    standardClean: true,
    deepClean: true,
    annualAmc: true,
  },
  {
    feature: "Scheduled Periodic Visits (Year-Round)",
    standardClean: false,
    deepClean: false,
    annualAmc: "2 - 4 Visits / Year",
  },
  {
    feature: "Free Unlimited Breakdown Calls",
    standardClean: false,
    deepClean: false,
    annualAmc: true,
  },
  {
    feature: "Zero Labour Charges on Repairs",
    standardClean: false,
    deepClean: false,
    annualAmc: true,
  },
  {
    feature: "Service Guarantee",
    standardClean: "7 Days",
    deepClean: "30 Days",
    annualAmc: "365 Days",
  },
];

export const CHIMNEY_TYPES_SUPPORTED = [
  {
    title: "Curved Glass Chimneys",
    description: "Sleek aesthetic curved glass canopies with high-suction motors. We specialize in delicate glass polishing and sensor calibration.",
    icon: "Sparkles",
  },
  {
    title: "Auto-Clean Chimneys",
    description: "Thermal heating auto-clean and water auto-clean models. We descale internal heating coils and flush blocked oil channels.",
    icon: "RefreshCw",
  },
  {
    title: "Straight Line / Box Chimneys",
    description: "Compact wall-mounted models with push buttons and cassette/baffle filters. Thorough degreasing of compact internal cavities.",
    icon: "ShieldCheck",
  },
  {
    title: "Island Kitchen Chimneys",
    description: "Ceiling-suspended center-island chimneys. Heavy-duty suspension check, 360-degree canopy polish, and duct balancing.",
    icon: "Wrench",
  },
  {
    title: "Ductless / Recirculating Chimneys",
    description: "Chimneys using activated carbon charcoal filters to purify smoke. Timely charcoal replacement and air purification checks.",
    icon: "Cpu",
  },
  {
    title: "Commercial & Modular Kitchen Hoods",
    description: "Heavy-exhaust stainless steel hoods for large modular kitchens, cloud kitchens, and home bakeries.",
    icon: "CalendarClock",
  },
];

export const BRANDS_SERVICED = [
  "Faber",
  "Glen",
  "Elica",
  "Hindware",
  "Sunflame",
  "Kaff",
  "Bosch",
  "Inalsa",
  "Prestige",
  "Blowhot",
  "Hafele",
  "Whirlpool",
  "Pigeon",
  "Siemens",
];

export const SERVICES_PAGE_FAQS: ServiceFaq[] = [
  {
    question: "How often should I get my kitchen chimney deep cleaned?",
    answer:
      "For typical Indian cooking involving daily tadkas, deep frying, and spices, we recommend a professional deep cleaning every 2 to 3 months. If your cooking is lighter, servicing every 4 to 6 months is usually sufficient. Regular cleaning keeps the motor running cool and prevents grease buildup inside the duct.",
  },
  {
    question: "Do you bring your own cleaning materials and degreasers?",
    answer:
      "Yes! Our technicians arrive fully equipped with professional appliance-safe degreasing solutions, cleaning brushes, hot-water tubs, protective sheets for your cooktop, and diagnostic tools. You do not need to provide any chemicals.",
  },
  {
    question: "How long does a chimney deep cleaning service take?",
    answer:
      "A complete deep cleaning typically takes 45 to 60 minutes. This includes disassembling the baffle filters and oil collector, deep chemical degreasing, motor blower wipe, reassembly, outer hood polish, and suction testing.",
  },
  {
    question: "What is covered under the 30-Day Service Guarantee?",
    answer:
      "If you experience any suction issues, unusual vibration, or filter looseness within 30 days of our service visit, our technician will revisit your home and re-inspect the chimney completely free of charge.",
  },
  {
    question: "Are your spare parts genuine and compatible with my brand?",
    answer:
      "Yes, we use 100% compatible OEM-grade spare parts (capacitors, switches, PCB touch boards, baffle filters, LED lights, and copper motors) suitable for all major brands including Faber, Elica, Glen, Hindware, Kaff, Bosch, and Sunflame.",
  },
  {
    question: "Can I book a technician for a specific time slot?",
    answer:
      "Absolutely. You can choose a convenient morning, afternoon, or evening time slot between 9:00 AM and 8:00 PM, Monday through Sunday. Same-day emergency appointments are also available via direct phone call or WhatsApp.",
  },
];
