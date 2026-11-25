export type ApplianceCategory =
  | "Kitchen Chimney"
  | "Kitchen Chimney Island"
  | "Built-In Hob"
  | "Cooktop"
  | "Built-In Microwave"
  | "Built-In Oven"
  | string;

export interface RateCardItem {
  id: string;
  appliance: ApplianceCategory;
  serviceType: string;
  description: string;
  price: number;
  priceDisplay: string;
  popular?: boolean;
}

export const RATE_CARD_ITEMS: RateCardItem[] = [
  // 1. Kitchen Chimney
  {
    id: "kc-basic",
    appliance: "Kitchen Chimney",
    serviceType: "Basic Service",
    description: "Filter cleaning, exterior wipe-down, suction check",
    price: 799,
    priceDisplay: "₹799",
  },
  {
    id: "kc-full",
    appliance: "Kitchen Chimney",
    serviceType: "Full Service",
    description: "Deep clean, motor check, auto-clean system service",
    price: 1099,
    priceDisplay: "₹1099",
    popular: true,
  },
  {
    id: "kc-repair",
    appliance: "Kitchen Chimney",
    serviceType: "Repair",
    description: "Motor replacement, suction restoration, LED fix, PCB repair",
    price: 350,
    priceDisplay: "₹350",
  },
  {
    id: "kc-install",
    appliance: "Kitchen Chimney",
    serviceType: "Installation Duct / Wallmount",
    description: "Wallmount",
    price: 350,
    priceDisplay: "₹350",
  },
  {
    id: "kc-uninstall",
    appliance: "Kitchen Chimney",
    serviceType: "Uninstallation",
    description: "Wallmount",
    price: 250,
    priceDisplay: "₹250",
  },

  // 2. Kitchen Chimney Island
  {
    id: "kci-basic",
    appliance: "Kitchen Chimney Island",
    serviceType: "Basic Service",
    description: "Filter cleaning, exterior wipe-down, suction check",
    price: 1050,
    priceDisplay: "₹1050",
  },
  {
    id: "kci-full",
    appliance: "Kitchen Chimney Island",
    serviceType: "Full Service",
    description: "Deep clean, motor check, auto-clean system service",
    price: 1500,
    priceDisplay: "₹1500",
    popular: true,
  },
  {
    id: "kci-install",
    appliance: "Kitchen Chimney Island",
    serviceType: "Installation",
    description: "Installation + Demo",
    price: 1200,
    priceDisplay: "₹1200",
  },
  {
    id: "kci-uninstall",
    appliance: "Kitchen Chimney Island",
    serviceType: "Uninstallation",
    description: "Uninstallation",
    price: 500,
    priceDisplay: "₹500",
  },

  // 3. Built-In Hob
  {
    id: "hob-basic",
    appliance: "Built-In Hob",
    serviceType: "Basic Service",
    description: "Jet clean, ignition check, flame calibration, gas valve check",
    price: 599,
    priceDisplay: "₹599",
  },
  {
    id: "hob-full",
    appliance: "Built-In Hob",
    serviceType: "Full Service",
    description: "Burner clean, hob glass remove & deep clean",
    price: 799,
    priceDisplay: "₹799",
    popular: true,
  },
  {
    id: "hob-repair",
    appliance: "Built-In Hob",
    serviceType: "Repair",
    description: "Jet change, burner change, gas Valve change, ignition change",
    price: 350,
    priceDisplay: "₹350",
  },
  {
    id: "hob-install",
    appliance: "Built-In Hob",
    serviceType: "Installation PNG/Commercial",
    description: "Installation",
    price: 350,
    priceDisplay: "₹350",
  },

  // 4. Cooktop
  {
    id: "cooktop-basic",
    appliance: "Cooktop",
    serviceType: "Basic Service",
    description: "Burner clean, glass clean, gas Leakage check",
    price: 275,
    priceDisplay: "₹275",
  },
  {
    id: "cooktop-install",
    appliance: "Cooktop",
    serviceType: "Installation PNG/Commercial",
    description: "Installation",
    price: 350,
    priceDisplay: "₹350",
  },

  // 5. Built-In Microwave
  {
    id: "mw-full",
    appliance: "Built-In Microwave",
    serviceType: "Full Service",
    description: "Inner/outer Cabinet clean, grill clean, plate clean",
    price: 599,
    priceDisplay: "₹599",
    popular: true,
  },
  {
    id: "mw-repair",
    appliance: "Built-In Microwave",
    serviceType: "Repair",
    description: "PCB repair, Magnetron change, capacitor change, diode replacement",
    price: 350,
    priceDisplay: "₹350",
  },
  {
    id: "mw-install",
    appliance: "Built-In Microwave",
    serviceType: "Installation",
    description: "Installation",
    price: 350,
    priceDisplay: "₹350",
  },

  // 6. Built-In Oven
  {
    id: "oven-full",
    appliance: "Built-In Oven",
    serviceType: "Full Service",
    description: "Inner/outer Cabinet clean, grill clean, diptray clean",
    price: 499,
    priceDisplay: "₹499",
  },
  {
    id: "oven-repair",
    appliance: "Built-In Oven",
    serviceType: "Repair",
    description: "PCB repair, element change, diptray change, grill tray change",
    price: 350,
    priceDisplay: "₹350",
  },
  {
    id: "oven-install",
    appliance: "Built-In Oven",
    serviceType: "Installation",
    description: "Installation",
    price: 350,
    priceDisplay: "₹350",
  },
];

export const RATE_CARD_APPLIANCES = [
  "All Appliances",
  "Kitchen Chimney",
  "Kitchen Chimney Island",
  "Built-In Hob",
  "Cooktop",
  "Built-In Microwave",
  "Built-In Oven",
] as const;

export const RATE_CARD_FOOTNOTE = "*spare parts will be charged seperately if any";
