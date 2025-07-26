# Splitfin UI Showcase App

A professional React dashboard showcase built with Next.js 14, TypeScript, and Recharts.

## Features

- 🎨 Professional dark theme dashboard
- 📊 6 interactive metric cards with 3 variants each
- 📈 Full-featured charts and graphs
- 🎯 Edit mode with live customization
- 📱 Fully responsive design
- ⚡ Optimized for Vercel deployment

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

1. Push this code to a GitHub repository
2. Connect your GitHub account to Vercel
3. Import the repository
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/splitfin-showcase)

## Project Structure

```
showcase-app/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main dashboard page
│   │   └── page.module.css  # Page styles
│   └── components/
│       ├── MetricCard.tsx   # KPI metric cards
│       ├── DashboardLayout.tsx # Sidebar layout
│       ├── DashboardHeader.tsx # Header controls
│       ├── FullGraph.tsx    # Main chart component
│       ├── CardTable.tsx    # Data tables
│       └── CardChart.tsx    # Pie charts
├── package.json
└── tsconfig.json
```

## Customization

### Colors
Edit the CSS variables in `globals.css`:

```css
:root {
  --primary-color: #79d5e9;
  --background-card: #1a1f2a;
  --background-dark: #0a0a0f;
  /* ... */
}
```

### Components
All components are modular and can be imported individually:

```tsx
import MetricCard from '@/components/MetricCard';
import FullGraph from '@/components/FullGraph';
```

## License

MIT © Splitfin UI