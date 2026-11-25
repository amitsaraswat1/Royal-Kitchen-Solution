# Shree Balaji Electronics - Kitchen Chimney Service Landing Page

A premium, conversion-focused, mobile-first single-page landing page built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS** for **Shree Balaji Electronics**.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v18.x or later, recommended v20+)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 3. Production Build & Verification
```bash
npm run build
npm run start
```

---

## ⚙️ How to Update Business Details

All site content, business details, pricing, services, and testimonials are organized in a single configuration file:
👉 **[`data/content.ts`](./data/content.ts)**

### 1. Updating Phone Number, Email & WhatsApp
In `data/content.ts`, edit `BUSINESS_INFO`:
```typescript
export const BUSINESS_INFO = {
  name: "Royal Kitchen Solution",
  phone: "8796886094",                      // Update 10-digit number here
  displayPhone: "+91 87968 86094",           // Display format
  callLink: "tel:+918796886094",             // Direct call link
  email: "info@shreebalajielectronics.com",   // Official business email
  emailLink: "mailto:info@shreebalajielectronics.com",
  whatsappNumber: "918796886094",           // 12-digit international WhatsApp number
  whatsappUrl: "https://wa.me/918796886094",
  hours: "Monday - Sunday: 9:00 AM - 8:00 PM",
};
```

### 2. Updating Pricing
In `data/content.ts`, edit `PRICING_DATA`:
- Replace placeholder prices (e.g. `"Starting at ₹___"`) with actual confirmed prices (e.g. `"Starting at ₹499"` or `"₹799"`).
- Set `isPlaceholderPrice: false` when a final price is verified.

### 3. Editing or Adding Services
In `data/content.ts`, edit `SERVICES_DATA` and `SERVICE_OPTIONS` to adjust titles, features, or service icons.

### 4. Updating Testimonials
In `data/content.ts`, edit `TESTIMONIALS_DATA`:
- Replace placeholder review entries with real customer reviews.
- Set `isPlaceholder: false`.
- **Note:** If `TESTIMONIALS_DATA` is empty (`[]`), the section will automatically hide itself gracefully on the landing page.

---

## 📋 Pre-Launch Checklist

Before launching to production:
- [ ] **Replace Demo Images**: Replace the generated demo photographs in `/public/images` with genuine before/after photographs from actual customer visits. Remove or adjust the "Demo image" badges in `data/content.ts`.
- [ ] **Confirm Final Prices**: Update `PRICING_DATA` with approved starting rates or retain "Price on Inspection" where diagnosis is required.
- [ ] **Add Real Customer Reviews**: Replace the placeholder testimonials in `TESTIMONIALS_DATA` with authentic reviews from satisfied customers.
- [ ] **Confirm Service Areas**: Verify geographical service boundaries and update the FAQ or hero text if localized city/locality messaging is needed.
- [ ] **Verify WhatsApp & Call Links**: Test the booking form and buttons on a live mobile device to ensure the WhatsApp redirect and direct dialer work smoothly.

---

## 🎨 Design System Tokens

- **Black**: `#111111` (`royal-black`)
- **Royal Gold**: `#C9A227` (`royal-gold`)
- **Warm Gold Accent**: `#E0B84C` (`warm-gold`)
- **Card Surfaces**: `#202020` (`royal-card`) / `#FAFAF8` (`royal-light`)
- **Headings Font**: Playfair Display (Serif)
- **Body Font**: Inter (Sans-serif)
