# Splitfin UI Kit - Commercial Dashboard Template

## 🚀 Overview

Splitfin UI Kit is a premium React dashboard template with 25+ beautifully designed components. Built with TypeScript, featuring zero dependencies (except React), and optimized for production use.

## 📦 What's Included

### Compact Package (£19)
- **Login Component** - Beautiful login page with social auth support
- **MasterLayout** - Responsive layout with sidebar navigation
- **Dashboard** with Overview & Revenue views
- **Components:**
  - MetricCard - Customizable metric display cards
  - CardTable - Data tables with sorting
  - DashboardHeader - Sleek, customizable header
  - ColorProvider - Theme management
  - AIInsightModal - AI-powered insights display
  - ProgressLoader - Loading states

### Full Package (£39)
Everything in Compact, plus:
- **All Dashboard Views:**
  - Orders View
  - Forecasting View
  - Invoices View
  - Brands View
- **Additional Components:**
  - CardChart - Interactive charts
  - DataTable - Advanced data tables
  - FullGraph - Full-size chart displays
  - TableCard - Combined table/card component
- **Customer Management System:**
  - CustomersManagement - Complete customer database
  - CustomerMap - Google Maps integration
  - CustomerDetail - Detailed customer profiles
- **Premium Support & 1 Year Updates**

## 🎨 Key Features

- **Modern Design**: Glassmorphism effects, smooth animations
- **Fully Customizable**: CSS variables, multiple color themes
- **100% TypeScript**: Complete type definitions
- **Responsive**: Mobile-first design
- **Zero Dependencies**: Only React required
- **Mock Data Included**: Realistic demo data
- **Production Ready**: Used in real applications

## 🛠️ Recent Updates

### Dashboard Improvements ✅
- ✅ Removed all API dependencies - now uses comprehensive mock data
- ✅ Created `useDashboard` hook with caching and refresh capabilities
- ✅ Enhanced mock data generator with realistic patterns
- ✅ Made DashboardHeader sleeker with inline controls

### All Views Updated ✅
- ✅ OverviewView - Uses outlet context for data
- ✅ RevenueView - Mock data integration complete
- ✅ OrdersView - Removed UserContext dependency
- ✅ InvoicesView - Updated to match mock data structure
- ✅ BrandsView - Works with mock brand data
- ✅ ForecastingView - Generates forecast from mock data
- ✅ SalesAgentOverviewView - Removed API calls, uses mock data

### New Landing Page ✅
- Professional sales page with Splitfin color scheme
- Interactive component demos
- Clear pricing tiers
- Background animation from Login component
- Live customization preview

### Demo System ✅
- Complete demo environment at `/demo`
- Interactive component showcase
- Full dashboard demo with routing
- Customer management demo
- Login page demo

## 📁 Project Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── Dashboard.tsx (main dashboard component)
│   │   ├── shared/ (all dashboard components)
│   │   └── views/ (dashboard view pages - all using mock data)
│   ├── Login/
│   ├── CustomersManagement/
│   ├── CustomerMap/
│   └── CustomerDetail/
├── hooks/
│   └── useDashboard.ts (mock data hook)
├── layouts/
│   └── MasterLayout.tsx
├── pages/
│   ├── LandingPage.tsx (sales page)
│   └── DemoPage.tsx (component demos)
└── utils/
    └── MOCKDATA.ts (comprehensive mock data)
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. View the landing page at `http://localhost:5173`
4. Try the demo at `http://localhost:5173/demo`

## 🎨 Customization

### Color Themes
The UI Kit uses CSS variables for easy theming:

```css
--primary-color: #79d5e9;    /* Ocean Blue */
--secondary-color: #799de9;   /* Sky Blue */
--tertiary-color: #79e9c5;    /* Mint Green */
--accent-orange: #FF9F00;     /* Sunset Orange */
--accent-rose: #C96868;       /* Rose */
```

### Component Variants
Most components support multiple visual variants:

```jsx
<MetricCard
  variant="variant1" // or variant2, variant3
  chartColor="#79d5e9"
/>
```

## 📊 Mock Data

The kit includes a comprehensive mock data system:

- 90 days of order history
- 30+ customers with locations
- Realistic revenue patterns
- Agent performance metrics
- Brand analytics
- Invoice management

All dashboard views now use this mock data through the outlet context pattern, ensuring consistent data across the entire dashboard.

## 🔧 TypeScript Support

All components are fully typed:

```typescript
interface DashboardProps {
  userId?: string;
  theme?: 'dark' | 'light';
  enableAIInsights?: boolean;
  enableCaching?: boolean;
  // ... more options
}
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 1024px, 1440px
- Touch-friendly interfaces
- Collapsible sidebars
- Adaptive layouts

## 🎯 Use Cases

Perfect for:
- Analytics dashboards
- Admin panels
- Business intelligence tools
- SaaS applications
- E-commerce backends
- CRM systems

## 📄 License

This is a commercial product. Purchase required for use in production applications.

## 🤝 Support

- Documentation: [Coming Soon]
- Email: support@splitfin.com
- Updates: Free for 1 year with Full Package

---

Built with ❤️ by Splitfin