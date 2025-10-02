# Search Sticker Management App - Design Guidelines

## Design Approach
**System-Based Approach**: Material Design + Linear-inspired aesthetics
- **Rationale**: Utility-focused mobile app requiring efficient data visualization, clear hierarchy, and touch-optimized interactions
- **Key Principles**: Information clarity, mobile-first responsiveness, data-driven design, consistent patterns

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary)**
- Background: 222 15% 10% (deep charcoal)
- Surface: 222 15% 14% (elevated panels)
- Surface elevated: 222 15% 18% (cards, modals)
- Primary: 210 100% 60% (bright blue for BLE connectivity)
- Success: 142 70% 50% (battery healthy)
- Warning: 38 92% 60% (battery low)
- Danger: 0 84% 60% (critical alerts)
- Text primary: 0 0% 95%
- Text secondary: 0 0% 65%
- Border: 222 15% 25%

**Light Mode**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Primary: 210 100% 50%
- Text primary: 222 15% 15%
- Text secondary: 222 10% 40%

### B. Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern, excellent readability
- **Mono Font**: JetBrains Mono - for technical data (MAC addresses, IDs)
- **Hierarchy**:
  - Hero/Dashboard Title: 2xl/3xl, font-bold (36-48px)
  - Section Headers: xl, font-semibold (24px)
  - Card Titles: lg, font-medium (18px)
  - Body Text: base, font-normal (16px)
  - Captions/Meta: sm, font-normal (14px)
  - Technical Data: sm, font-mono

### C. Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 consistently
- Component padding: p-4, p-6
- Section spacing: space-y-6, space-y-8
- Card gaps: gap-4
- Icon sizing: w-6 h-6, w-8 h-8

**Responsive Containers**:
- Mobile (base): px-4, max-w-full
- Tablet (md): px-6, max-w-3xl
- Desktop (lg): px-8, max-w-5xl

### D. Component Library

**Navigation**
- Bottom navigation bar (mobile): 4-5 primary actions with icons
- Top app bar: Fixed header with title, search icon, menu
- Sticky tabs for section switching (Dashboard/Devices/Documentation)

**Sticker Cards**
- Compact card design with: Device name, battery indicator (circular progress), RSSI signal strength bars, last seen timestamp, status badge
- Swipe actions: Archive left, Details right
- Touch target: Minimum 44x44px for all interactive elements

**Status Indicators**
- Battery: Circular progress ring with percentage in center, color-coded (green >50%, yellow 20-50%, red <20%)
- Signal Strength: Vertical bars (1-5), color-coded by RSSI value
- Connection Status: Dot indicator (green: active, gray: inactive, blue: scanning)

**Data Visualization**
- Cost Calculator: Interactive slider with real-time calculation, breakdown card grid
- Risk Matrix: Filterable table with impact badges, expandable rows for solutions
- Device Timeline: Vertical timeline showing activity history

**Forms & Inputs**
- Asset Assignment: Dropdown with search, tag input for categories
- Search Bar: Persistent at top with filter chips below
- All inputs: Consistent dark mode styling, clear focus states with blue ring

**Buttons**
- Primary: Filled blue (primary color)
- Secondary: Outline style with subtle background on dark mode
- Icon buttons: Circular 44px touch targets
- FAB: Fixed bottom-right for "Add Sticker" action

**Modals & Overlays**
- Full-screen modal for device details on mobile
- Bottom sheet for quick actions (assign, locate, archive)
- Toast notifications for confirmations and errors

### E. Animations
Use sparingly:
- Page transitions: Subtle slide (200ms)
- Card interactions: Scale on tap (0.98 transform, 150ms)
- Loading states: Skeleton screens, not spinners
- No decorative animations - focus on functional feedback

---

## Page-Specific Guidelines

**Dashboard (Home)**
- Hero metric cards (3-column grid on desktop, stacked on mobile): Total stickers, Active devices, Low battery alerts
- Recent activity list with timestamps
- Quick action buttons: "Scan for devices", "View all stickers"

**Sticker Inventory**
- Search bar with filter chips (All/Active/Low Battery/Inactive)
- Grid layout: 1 column mobile, 2 columns tablet, 3 columns desktop
- Infinite scroll pagination
- Empty state: Illustration with "Add your first sticker" CTA

**Device Details**
- Hero section: Large battery indicator, device name, edit icon
- Info grid: MAC address, firmware version, last sync time
- Action cards: "Locate sticker" (triggers LED), "Assign to asset", "View history"
- Activity timeline: Chronological events with icons

**Documentation Viewer**
- Tabbed interface: Overview, Technical Specs, Cost Analysis, Risk Matrix
- Cost calculator: Production volume slider (10-10,000 units), dynamic cost breakdown
- Risk matrix: Sortable table with color-coded impact levels, expandable solution details

**Special Features**
- Pull-to-refresh on all list views
- Haptic feedback on iOS for interactions
- Dark mode toggle in settings (defaults to system preference)

---

## Images & Media
- No hero images required (data-focused utility app)
- Device placeholder icons: Use Heroicons for BLE, battery, signal icons
- Empty states: Simple line illustrations in brand blue
- Documentation: Embedded diagrams for technical specs (BLE architecture, power consumption graphs)

---

## Accessibility
- WCAG AA contrast ratios maintained in dark mode
- Touch targets minimum 44x44px
- Focus indicators on all interactive elements
- Screen reader labels for all icons and status indicators
- Reduced motion support for animations