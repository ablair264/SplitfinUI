# Silkr - Modern React Dashboard Components

Beautiful, production-ready React components for building professional dashboards and admin interfaces.

## Features

- 🎨 **Beautiful Design** - Modern, clean components that look great out of the box
- 📊 **Chart Integration** - Built-in support for Recharts with responsive designs
- 🎯 **TypeScript Support** - Full TypeScript definitions for type safety
- 📱 **Responsive** - Mobile-first design that works on all screen sizes
- 🚀 **Performance** - Optimized for speed with lazy loading and code splitting
- 🎨 **Customizable** - Flexible theming with CSS modules and color variants

## Installation

```bash
npm install silkr
# or
yarn add silkr
```

## Quick Start

```tsx
import React from 'react';
import { MetricCard, CardChart, TableCard, ColorProvider } from 'silkr';

function MyDashboard() {
  return (
    <ColorProvider>
      <div style={{ padding: '24px' }}>
        {/* Metric Cards */}
        <MetricCard
          title="Revenue"
          value="$125,430"
          change="+12.5%"
          trend="up"
          variant="variant1"
          color="primary"
        />
        
        {/* Chart Card */}
        <CardChart
          title="Sales Overview"
          data={salesData}
          type="bar"
          color="primary"
        />
        
        {/* Table Card */}
        <TableCard
          title="Recent Orders"
          data={ordersData}
          columns={columns}
        />
      </div>
    </ColorProvider>
  );
}
```

## Components

### Core Components

#### MetricCard
Displays a key metric with optional trend chart.

```tsx
<MetricCard
  title="Revenue"
  value="$125,430"
  change="+12.5%"
  trend="up"
  data={chartData}
  variant="variant1" // variant1 | variant2 | variant3
  color="primary"    // primary | secondary | tertiary | etc.
/>
```

#### MetricCardSquare
Compact square metric card for space-efficient layouts.

```tsx
<MetricCardSquare
  title="Orders"
  value="1,234"
  change="+8.2%"
  trend="up"
  variant="variant1"
  color="secondary"
/>
```

#### CardChart
Flexible chart component supporting multiple chart types.

```tsx
<CardChart
  title="Sales Overview"
  data={data}
  type="bar"        // bar | line | pie | horizontal-bars
  color="primary"
/>
```

#### TableCard
Data table with sorting and formatting options.

```tsx
<TableCard
  title="Recent Orders"
  data={orders}
  columns={[
    { key: 'id', label: 'Order ID' },
    { key: 'amount', label: 'Amount', format: 'currency' },
    { key: 'status', label: 'Status' }
  ]}
/>
```

### Layout Components

#### MasterLayout
Full-featured layout with sidebar navigation and header.

```tsx
<MasterLayout
  user={currentUser}
  navigationSections={navItems}
  onLogout={handleLogout}
>
  {/* Your dashboard content */}
</MasterLayout>
```

#### DashboardHeader
Page header with title and actions.

```tsx
<DashboardHeader
  title="Dashboard"
  subtitle="Welcome back!"
  actions={[
    { label: 'Export', onClick: handleExport },
    { label: 'Settings', onClick: handleSettings }
  ]}
/>
```

### Utility Components

#### ColorProvider
Provides theme context for color consistency.

```tsx
<ColorProvider>
  {/* Your app components */}
</ColorProvider>
```

#### ProgressLoader
Loading indicator with progress tracking.

```tsx
<ProgressLoader
  progress={75}
  message="Loading data..."
/>
```

## Theming

Silkr uses a flexible color system with 11 predefined color variants:

- `primary` - #79d5e9 (Light Blue)
- `secondary` - #799de9 (Blue)
- `tertiary` - #79e9c5 (Teal)
- `fourth` - #FF9F00 (Orange)
- `fifth` - #C96868 (Red)
- `sixth` - #4daeac (Dark Teal)
- `seventh` - #61bc8e (Green)
- `eighth` - #a37dda (Purple)
- `ninth` - #bae96a (Lime)
- `tenth` - #ff6bb3 (Pink)
- `eleventh` - #97A3A3 (Gray)

## Examples

Check out the `/examples` directory for complete dashboard implementations:

- `SimpleDashboard.tsx` - Basic dashboard setup
- `AdvancedDashboard.tsx` - Complex layouts with multiple views
- `CustomTheme.tsx` - Custom theming example

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build:lib

# Build demo site
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT © Alastair Blair

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please [open an issue](https://github.com/yourusername/silkr/issues) on GitHub.