# SplitfinUI - Premium Dashboard Components

Professional React dashboard components with stunning design, perfect for building modern web applications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Local Development

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```

3. **Open Browser**
Navigate to `http://localhost:3000`

### Demo Access
- **Login**: `demo@example.com`
- **Password**: `demo123`

## 📦 Available Components

### Compact Package (£29)
- MetricCard - Animated metric displays with charts
- CardTable & DataTable - Responsive data tables
- FullGraph - Large-scale graph component
- TableCard & CardChart - Chart and ranking displays
- Progress Loader - Elegant loading states

### Enhanced Package (£49)
- All Compact components plus:
- AI Insights Modal - Advanced analytics
- Customer Management - Complete CRUD interface
- Interactive Maps - Google Maps integration
- Complete Dashboard - Full layout system

## 🌐 Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/splitfinui.git
git push -u origin main
```

2. **Deploy via Vercel Dashboard**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Vite configuration
- Click "Deploy"

### Option 2: Vercel CLI

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Follow prompts:**
- Set up and deploy? `Y`
- Which scope? Select your account
- Link to existing project? `N`
- Project name: `splitfinui` (or your choice)
- Directory: `./` (current directory)
- Want to override settings? `N`

### Environment Variables (Optional)

For Google Maps functionality, add in Vercel dashboard:
```
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

## 🛠 Build & Preview

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
splitfinui/
├── components/          # React components
│   ├── shared/         # Reusable components
│   ├── Login.tsx       # Authentication
│   ├── Dashboard.tsx   # Main dashboard
│   └── ...
├── layouts/            # Layout components
├── utils/              # Utilities & mock data
├── styles/             # Global styles
├── public/             # Static assets
├── dist/              # Build output (generated)
└── package.json       # Dependencies
```

## 🎨 Customization

### Color Themes
Components use CSS custom properties for easy theming:
```css
:root {
  --primary-color: #79d5e9;
  --secondary-color: #4daeac;
  --background-dark: #0f1419;
  --card-background: #1a1f2a;
}
```

### Component Variants
Most components support multiple visual variants:
```tsx
<MetricCard variant="variant1" />
<MetricCard variant="variant2" />
<MetricCard variant="variant3" />
```

## 📱 Responsive Design

All components are fully responsive with:
- Mobile-first approach
- Container queries
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔧 Technical Stack

- **React 18** - Latest React with hooks
- **TypeScript** - Full type safety
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons
- **Google Maps API** - Interactive maps

## 📄 License

This is a premium UI component library. 

### Licensing:
- **Single Project License** - Use in one commercial project
- **Extended License** - Use in multiple projects
- **Developer License** - Use in client projects

## 🤝 Support

- Email: support@example.com
- Documentation: [docs link]
- GitHub Issues: [repository link]

## 🚀 Deployment URLs

After deployment, your app will be available at:
- Production: `https://your-project.vercel.app`
- Preview deployments for each push

---

Made with ❤️ by the SplitfinUI team