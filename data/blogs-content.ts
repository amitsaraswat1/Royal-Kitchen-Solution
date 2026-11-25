export interface BlogSection {
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  callout?: {
    type: "tip" | "warning" | "note";
    title: string;
    text: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string;
  readTime: string;
  category: "Maintenance & Cleaning" | "Troubleshooting & Repair" | "Buying Guide" | "Installation & Care";
  image: string;
  tags: string[];
  summaryHighlights: string[];
  sections: BlogSection[];
  faqs?: { question: string; answer: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-often-to-clean-kitchen-chimney-india",
    title: "How Often Should You Deep Clean Your Kitchen Chimney in Indian Cooking?",
    excerpt:
      "Tadka, deep frying, and rich spices generate heavy grease aerosols. Discover the ideal cleaning frequency for baffle filters, filterless motors, and oil collectors to prevent grease fires and suction loss.",
    publishedDate: "November 2026",
    readTime: "5 min read",
    category: "Maintenance & Cleaning",
    image: "/images/service-cleaning.jpg",
    tags: ["Chimney Cleaning", "Indian Kitchen", "Baffle Filter", "Maintenance"],
    summaryHighlights: [
      "Indian tadka and frying require baffle filter washing every 2 to 3 weeks.",
      "Filterless chimneys still require full internal blower degreasing every 4 to 6 months.",
      "Clogged oil collector cups must be emptied fortnightly to avoid grease back-drips.",
      "Professional caustic-free deep cleaning once every 3-6 months prevents motor failure.",
    ],
    sections: [
      {
        heading: "Why Indian Kitchens Need Special Chimney Maintenance",
        paragraphs: [
          "Traditional Indian culinary techniques involve high-temperature tempering (tadka), deep-frying in ghee or mustard oil, and simmering rich gravies with ground spices. These cooking methods release heavy volatile fat vapors that quickly cool down and adhere to the metal surfaces of your chimney.",
          "Unlike Western boiling or baking, Indian kitchen vapors form a thick, sticky amber varnish over baffle blades and inside the blower housing. Over time, this grease layer restricts airflow, strains the motor, and creates a potential kitchen fire hazard.",
        ],
        callout: {
          type: "warning",
          title: "Fire Hazard Warning",
          text: "Accumulated cooking grease has a low ignition flashpoint. If oil drips close to an active high-flame gas burner, it can cause a flash fire inside the duct pipe.",
        },
      },
      {
        heading: "Recommended Cleaning Schedule by Chimney Type",
        paragraphs: [
          "Not all chimneys have the same maintenance cycles. Depending on your hood design and daily cooking intensity, follow these guidelines:",
        ],
        listItems: [
          "Baffle Filter Chimneys: Soak and scrub metal baffles in warm degreasing water every 2 to 3 weeks. Baffle channels redirect heavy grease into the collector, but once saturated, oil will begin dripping onto your countertop.",
          "Filterless Chimneys: Wipe exterior suction slots weekly and clean the rear oil collector cup every 10–14 days. Schedule a professional internal rotor degrease every 4 to 6 months.",
          "Mesh / Cassette Filter Chimneys: Clean delicate multi-layer aluminum mesh every 7–10 days. Avoid sharp wire brushes that tear the fine mesh fabric.",
          "Charcoal / Carbon Filters (Ductless): These cannot be washed. Replace carbon pads every 3 to 6 months depending on usage.",
        ],
      },
      {
        heading: "Step-by-Step Routine Cleaning at Home vs Professional Deep Cleaning",
        paragraphs: [
          "For routine home care, prepare a solution of warm water, dishwashing degreaser, and 2 tablespoons of baking soda. Soak the detached baffle filters for 20 minutes before gently brushing away softened grease. Never use harsh industrial caustic soda at home without protective gloves and ventilation, as it corrodes aluminum and dulls stainless steel polish.",
          "Professional doorstep deep cleaning by Royal Kitchen Solution goes significantly further. Our certified technicians disassemble the outer casing, extract the internal rotary impeller, apply specialized food-safe non-corrosive foam cleaners, flush out the grease channels, and verify post-cleaning suction with CFM anemometer gauges.",
        ],
        callout: {
          type: "tip",
          title: "Technician Tip",
          text: "Always turn off the main 16A power switch and disconnect the plug before cleaning any part of your chimney or touching the oil cup.",
        },
      },
      {
        heading: "Signs That Your Chimney Urgently Needs Deep Cleaning",
        paragraphs: [
          "Do not wait for your scheduled date if you notice any of these red flags in your kitchen:",
        ],
        listItems: [
          "Smoke lingering in the room after frying or tadka.",
          "Oil droplets leaking from the filter joints or corner seams.",
          "Unusual vibration or strained motor hum when operating at speed 2 or 3.",
          "Sticky, yellowed grease residue coating nearby kitchen cabinet doors.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I wash chimney baffle filters in a dishwasher?",
        answer:
          "Yes, high-grade stainless steel baffle filters can be washed on a heavy-duty pots & pans cycle. However, ensure no plastic clips or rubber gaskets remain attached before placing them inside.",
      },
      {
        question: "How long does professional doorstep chimney deep cleaning take?",
        answer:
          "A comprehensive doorstep deep cleaning by Royal Kitchen Solution typically takes between 60 to 90 minutes, including complete disassembly, degreasing, reassembly, and suction testing.",
      },
    ],
  },
  {
    slug: "chimney-low-suction-noise-troubleshooting",
    title: "Kitchen Chimney Making Loud Noise or Not Sucking Smoke? 6 Diagnostic Checks & Solutions",
    excerpt:
      "Is your kitchen filling with smoke or vibrating like a generator? Learn the 6 primary causes of chimney suction loss and excessive blower noise, and how certified technicians resolve them.",
    publishedDate: "November 2026",
    readTime: "6 min read",
    category: "Troubleshooting & Repair",
    image: "/images/service-repair.jpg",
    tags: ["Chimney Repair", "Low Suction", "Noise Fix", "Troubleshooting"],
    summaryHighlights: [
      "90% of suction loss is caused by saturated filters or restricted duct pipe bends.",
      "Rattling noise usually indicates a loose blower impeller or foreign object in the duct.",
      "Humming motor with stationary fan blades points to a faulty starting capacitor.",
      "Flexible aluminum duct pipes with more than 2 sharp 90° bends reduce suction by over 40%.",
    ],
    sections: [
      {
        heading: "1. Saturated Filters Choking Air Intake",
        paragraphs: [
          "The most common cause of poor suction is heavy grease accumulation on the filter surface. When oil solidifies between baffle slots, the blower cannot draw ambient kitchen air through the restricted apertures. Test this easily: turn on the chimney without the filters in place (for 10 seconds only) and hold a sheet of lightweight paper underneath.",
          "If the paper sticks firmly against the suction intake, your blower motor is operating correctly and the filters simply require an intensive professional degreasing service.",
        ],
      },
      {
        heading: "2. Flexible Aluminum Duct Obstruction or Excessive Bends",
        paragraphs: [
          "Airflow resistance increases drastically with each duct bend. A standard 6-inch exhaust duct that features three 90-degree elbows loses up to 45% of its rated suction capacity. Furthermore, flexible corrugated aluminum pipes tend to sag over time, collecting heavy grease pockets inside the ridges.",
          "Check the outdoor exhaust cowl: often, birds build nests or the external gravity flaps get stuck closed by hardened grease and dust, completely blocking the exhaust path.",
        ],
        callout: {
          type: "note",
          title: "Ducting Best Practice",
          text: "Whenever possible, use rigid PVC or anti-rust insulated ducting with a maximum of two smooth 45-degree bends to maintain optimal cubic meters per hour (m³/hr) suction.",
        },
      },
      {
        heading: "3. Motor Humming Loudly but Blades Won't Rotate",
        paragraphs: [
          "If you press the speed switch and hear an electrical hum or buzz without any air moving, your blower motor capacitor has likely degraded. Single-phase induction motors depend on a 2.5µF to 4µF capacitor to provide starting torque.",
          "A technician can quickly discharge, test, and replace the capacitor with an OEM-grade component within 20 minutes, restoring full motor spin without requiring a costly motor rewind.",
        ],
      },
      {
        heading: "4. Vibrations and Screeching Noises",
        paragraphs: [
          "A screeching or grinding sound when operating at high speed indicates dry or worn motor ball bearings. As grease vapor penetrates past faulty shaft oil seals, it breaks down the internal lubricant inside the bearings.",
          "Rattling or heavy wobbling sounds typically happen when uneven grease weight coats one side of the centrifugal blower wheel, throwing off the dynamic balance, or when mounting wall anchors have worked loose.",
        ],
        callout: {
          type: "warning",
          title: "Do Not Run an Imbalanced Motor",
          text: "Operating an imbalanced vibrating chimney damages the motor shaft and can crack the internal plastic blower housing. Call for doorstep inspection immediately.",
        },
      },
    ],
    faqs: [
      {
        question: "Why does smoke blow back into my kitchen when the chimney is running?",
        answer:
          "Smoke blowback occurs when the exhaust duct is blocked, the external one-way non-return valve (NRV) is stuck closed, or the duct pipe has collapsed from grease weight.",
      },
      {
        question: "Can worn motor bearings be lubricated at home?",
        answer:
          "Modern chimney motors use sealed precision ball bearings. They cannot be reliably oiled with WD-40 or machine oil; once worn or noisy, they must be pressed out and replaced with genuine sealed bearings.",
      },
    ],
  },
  {
    slug: "filterless-vs-baffle-filter-chimney-comparison",
    title: "Filterless vs Baffle Filter Chimney: Which is Truly Better for Modern Indian Kitchens?",
    excerpt:
      "Comparing suction efficiency, cleaning hassle, lifespan, and maintenance costs between baffle filter and filterless chimneys for heavy daily cooking.",
    publishedDate: "November 2026",
    readTime: "7 min read",
    category: "Buying Guide",
    image: "/images/service-filter.jpg",
    tags: ["Filterless Chimney", "Baffle Filter", "Buying Guide", "Kitchen Ventilation"],
    summaryHighlights: [
      "Filterless chimneys have higher unobstructed airflow (1200–1500 m³/hr) but deposit oil directly onto the blower wheel.",
      "Stainless steel baffle filter chimneys provide better long-term motor protection by trapping 80%+ grease before the motor.",
      "Filterless models require less frequent filter scrubbing, but require professional internal cleaning every 4-6 months.",
      "For joint families cooking deep-fried parathas and heavy tadka daily, a curved glass baffle chimney remains the most durable choice.",
    ],
    sections: [
      {
        heading: "Understanding the Core Architectural Difference",
        paragraphs: [
          "When buying or upgrading a kitchen chimney in India, the choice between Baffle Filter and Filterless technology is the single most important decision. Both claim superior performance, but they operate on completely different aerodynamic principles.",
          "Baffle Filter chimneys use curved stainless steel panels arranged in an overlapping zigzag pattern. When greasy vapor hits these panels, it is forced to rapidly change direction. Dense fat particles separate by centrifugal force and slide down into an oil collector cup, allowing cleaner air to enter the motor chamber.",
          "Filterless chimneys completely eliminate metal filter panels. Greasy fumes enter directly through an open suction slot toward the high-speed impeller fan. The fan's high rotational velocity flings oil droplets outwards onto a slanted housing wall, which drains into a rear collector.",
        ],
      },
      {
        heading: "Direct Comparison: Head-to-Head",
        paragraphs: [
          "Here is how both technologies perform across key criteria in Indian cooking conditions:",
        ],
        listItems: [
          "Suction Power: Filterless models generally claim higher suction ratings (1300–1600 m³/hr) because there is no metal mesh or baffle resisting the incoming air. Baffle models range from 1000–1350 m³/hr.",
          "Weekly Maintenance: Filterless wins for daily convenience. You only wipe the smooth glass undercarriage and empty the oil cup every two weeks. Baffle filters require periodic scrubbing in warm soapy water.",
          "Motor Protection: Baffle filters protect the motor much better. Because baffles catch up to 85% of sticky oil before it reaches the blower, the motor runs cooler and stays cleaner for years.",
          "Long-Term Maintenance Cost: In filterless chimneys, fine oil aerosols inevitably coat the internal rotor blades. Without periodic professional deep cleaning, this buildup slows down the motor and causes premature winding burnout.",
        ],
        callout: {
          type: "tip",
          title: "Our Verdict for Delhi NCR Homes",
          text: "If you cook light to moderate meals 1-2 times daily, a filterless chimney with auto-clean is very convenient. If your home has a large family cooking heavy tadka, non-veg, and deep-fried dishes twice a day, a heavy-duty curved baffle filter chimney will give you 2-3x longer motor life.",
        },
      },
      {
        heading: "What About 'Thermal Auto-Clean' Features?",
        paragraphs: [
          "Many filterless models feature an electrical heating coil wrapped around the motor housing called 'Auto-Clean'. When activated, it heats the metal to ~50°C for 10 minutes to liquefy surface grease so it drips into the tray.",
          "While Auto-Clean helps melt light grease deposits, it cannot dissolve hardened carbonized oil or dust bonded to the blower fins. Auto-clean extends the interval between services, but does not replace periodic professional deep cleaning.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I convert a baffle filter chimney into a filterless one?",
        answer:
          "No. Filterless chimneys utilize specialized sealed copper motors and uniquely balanced teflon-coated impellers specifically engineered to handle direct vapor contact. Removing baffles from a standard chimney will ruin the motor quickly.",
      },
      {
        question: "Are touchless motion-sensor gestures worth the extra cost?",
        answer:
          "Yes. Motion sensor controls (waving hand to turn on/adjust speed) are extremely practical when your hands are covered in flour, oil, or spices, preventing grease buildup on physical buttons.",
      },
    ],
  },
  {
    slug: "chimney-installation-height-duct-pipe-guide",
    title: "Kitchen Chimney Installation: Ideal Height, Duct Pipe Sizing & Common Mistakes to Avoid",
    excerpt:
      "Installing your chimney too high reduces suction; installing it too low poses a fire risk. Complete guide to installation distance, duct pipe diameter, and wall bracket alignment.",
    publishedDate: "November 2026",
    readTime: "6 min read",
    category: "Installation & Care",
    image: "/images/service-installation.jpg",
    tags: ["Chimney Installation", "Duct Pipe", "Fitting Guide", "Kitchen Safety"],
    summaryHighlights: [
      "Ideal clearance between gas stove burners and the chimney base is 65 cm to 75 cm (26 to 30 inches).",
      "Standard duct pipe diameter should be 6 inches (150 mm) for modern high-suction chimneys.",
      "Never vent your chimney into a closed false ceiling or bathroom exhaust shaft.",
      "Anti-vibration wall anchors prevent rattles, noise, and masonry loosening over time.",
    ],
    sections: [
      {
        heading: "1. The Golden Rule of Installation Height",
        paragraphs: [
          "The distance between your kitchen cooktop and the bottom surface of the chimney hood directly dictates extraction efficiency and home safety:",
        ],
        listItems: [
          "Standard Gas Stove: 65 cm to 75 cm (26 to 30 inches). Installing below 65 cm allows direct flame heat to warp electronic sensors, melt grease collectors, and risk ignition.",
          "Induction / Ceramic Cooktop: 60 cm to 70 cm (24 to 28 inches). Because induction cooktops do not produce open flame, the hood can be mounted slightly lower for maximum capture.",
          "Installing Above 75 cm: Reduces suction effectiveness by up to 50%. Thermal air currents disperse grease vapors across the room before reaching the suction cone.",
        ],
        callout: {
          type: "warning",
          title: "Safety Standard",
          text: "Never install a kitchen chimney lower than 60 cm above a gas cooktop. Always maintain at least 65 cm clearance from the top of the burner trivets.",
        },
      },
      {
        heading: "2. Exhaust Duct Pipe Diameter & Routing",
        paragraphs: [
          "A powerful 1200 m³/hr chimney forced through a narrow 4-inch pipe produces deafening wind whistle and suffocated suction. High-capacity modern chimneys require a full 6-inch (150 mm) diameter exhaust duct.",
          "Keep duct length as short as possible: under 10 feet is ideal. Ensure the duct has a slight downward slope of 1–2 degrees towards the exterior wall so any condensed grease drains away from the motor.",
        ],
      },
      {
        heading: "3. Wall Core Cutting and External Cowl Fitting",
        paragraphs: [
          "Professional installation requires drilling a neat 6-inch round core hole through the exterior kitchen wall. The opening must be sealed with weatherproof silicone sealant around the duct perimeter to prevent rainwater and insect intrusion.",
          "An exterior exhaust cowl with gravity flaps or stainless steel wire mesh prevents pigeons, lizards, and back-drafting winds from entering your kitchen when the chimney is switched off.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I install a kitchen chimney without an exhaust duct pipe?",
        answer:
          "Yes, through ductless mode using activated carbon filters. However, ductless chimneys only filter odor and recirculate air into the kitchen; they do not remove humidity or hot steam. Ducted installation is always strongly recommended for Indian cooking.",
      },
      {
        question: "How much time does professional chimney installation take?",
        answer:
          "If the core hole is already prepared, standard mounting, ducting, and electrical setup takes around 45 to 60 minutes. If wall core drilling is required, it takes approximately 90 to 120 minutes.",
      },
    ],
  },
  {
    slug: "signs-chimney-motor-needs-repair-or-replacement",
    title: "5 Warning Signs Your Chimney Motor Needs Immediate Servicing or Rewinding",
    excerpt:
      "Is your chimney motor running hot, producing a burning smell, or spinning sluggishly? Discover when an affordable capacitor swap or copper rewinding saves your appliance from total failure.",
    publishedDate: "November 2026",
    readTime: "5 min read",
    category: "Troubleshooting & Repair",
    image: "/images/service-motor.jpg",
    tags: ["Motor Repair", "Motor Rewinding", "Appliance Maintenance", "Diagnostic"],
    summaryHighlights: [
      "Acrid burning odor indicates overheating motor winding insulation or a melted capacitor casing.",
      "If the motor hums but only spins after a manual push, the starting capacitor has blown.",
      "Uneven high-pitched squealing means bearing lubrication has dried out from heat and grease.",
      "Prompt motor rewinding with 100% pure copper wire saves up to 70% compared to buying a replacement motor.",
    ],
    sections: [
      {
        heading: "1. Distinct Acrid or Burning Odor",
        paragraphs: [
          "If you notice an unmistakable smell of burnt varnish, plastic, or ozone while your chimney is switched on, immediately turn off the power at the wall switchboard.",
          "Chimney motors contain tightly coiled copper wire insulated with heat-resistant enamel varnish. When grease chokes cooling vents, the internal operating temperature exceeds 130°C, causing the enamel coating to melt and short-circuit adjacent coils.",
        ],
        callout: {
          type: "warning",
          title: "Immediate Action Required",
          text: "Never continue operating a chimney that produces an electrical burning odor. A short-circuit can blow the internal PCB transformer or trip your home's main MCB breaker.",
        },
      },
      {
        heading: "2. Motor Won't Start Without Manual Help",
        paragraphs: [
          "A classic diagnostic symptom: when you switch on the chimney, the motor produces a soft humming noise, the lights turn on, but the fan wheel stays stationary. If you push the fan wheel lightly with a pencil and it suddenly begins spinning, the culprit is almost certainly the start capacitor, not the motor itself.",
          "Capacitors cost a fraction of a new motor. Replacing this small cylinder restores immediate high-speed spin without requiring any motor disassembly.",
        ],
      },
      {
        heading: "3. Speed 1, 2, and 3 All Run at the Same Low Speed",
        paragraphs: [
          "Chimney motors feature multi-tapped winding coils or electronic triac controllers that vary fan speed. When the speed selector switch or PCB relay fails, the motor becomes stuck on a single slow speed or refuses to shut off.",
          "Our technicians test both the PCB output voltages and motor tap resistances to determine whether the fault lies in the control board or the internal speed winding taps.",
        ],
      },
      {
        heading: "4. Copper Rewinding vs OEM Motor Replacement",
        paragraphs: [
          "If testing confirms that the motor winding has burnt out, customers often wonder whether to rewind or replace the unit.",
          "Professional precision rewinding using high-grade 100% pure electrolytic copper wire and Class-H insulation varnish restores the motor to 95%+ of its original performance at roughly one-third the cost of a brand new manufacturer motor. When backed by our 30-day service warranty, copper rewinding is the most cost-effective and sustainable solution.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does a rewound chimney motor last?",
        answer:
          "A properly rewound chimney motor with 100% copper wire, new sealed ball bearings, and proper heat-cured varnish lasts 3 to 5+ years, provided regular filter cleaning prevents grease buildup.",
      },
      {
        question: "Do you provide doorstep motor diagnosis across Delhi NCR?",
        answer:
          "Yes, Royal Kitchen Solution technicians carry digital multimeters, test capacitors, and bearing pullers to diagnose motor issues right in your kitchen.",
      },
    ],
  },
];
