# SplitfinUI Documentation

This directory contains the comprehensive documentation for the SplitfinUI component library.

## 📁 Structure

```
documentation/
├── index.html      # Main documentation HTML
├── styles.css      # Documentation styles (based on MasterLayout design)
├── script.js       # Interactive functionality
└── README.md       # This file
```

## 🚀 Viewing the Documentation

### Local Development
1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

### Live Version
The documentation is available at: `/documentation/index.html` when the main site is running.

## 🎨 Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes with the sun/moon icon
- **Navigable Sidebar**: Based on the MasterLayout component design
- **Code Highlighting**: Syntax highlighting with Prism.js
- **Copy Code Buttons**: Easy code copying functionality
- **Smooth Scrolling**: Navigate between sections smoothly
- **Print-Friendly**: Optimised for printing documentation

## 📝 Content Sections

1. **Getting Started**
   - Overview
   - Installation
   - Project Structure
   - Quick Start Guide

2. **Components**
   - MasterLayout
   - Dashboard
   - Login
   - MetricCard
   - CardChart
   - CardTable
   - CustomerMap

3. **Customisation**
   - Theming
   - Colours
   - Typography
   - CSS Variables

4. **Data & Hooks**
   - Mock Data System
   - useDashboard Hook
   - Data Integration

5. **TypeScript**
   - Type Definitions
   - Interfaces
   - Using Generics

6. **Deployment**
   - Vercel
   - Netlify
   - Environment Variables

7. **Examples**
   - Basic Setup
   - Custom Theme
   - API Integration

## 🔧 Updating Documentation

### Adding a New Section

1. Add navigation item in `index.html`:
```html
<a href="#new-section" class="doc-sidebar-dropdown-item">
    <span class="dropdown-text">New Section</span>
</a>
```

2. Add content section:
```html
<section id="new-section" class="doc-section">
    <h1>New Section Title</h1>
    <p class="section-intro">Introduction text...</p>
    <!-- Your content here -->
</section>
```

### Adding Code Examples

Use the code block structure:
```html
<div class="code-block">
    <pre><code class="language-jsx">
// Your code here
    </code></pre>
</div>
```

### Adding Tables

Use the props table structure:
```html
<div class="props-table">
    <table>
        <thead>
            <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>propName</code></td>
                <td><code>string</code></td>
                <td><code>'default'</code></td>
                <td>Description of the property</td>
            </tr>
        </tbody>
    </table>
</div>
```

## 🎯 Style Guidelines

- Use British English throughout
- Keep examples concise and practical
- Include TypeScript types for all code examples
- Provide both basic and advanced examples
- Use semantic HTML for better accessibility

## 🐛 Known Issues

- On mobile devices, the sidebar may need manual closing after selecting a section
- Print layout works best in Chrome/Edge browsers

## 📄 License

This documentation is part of the SplitfinUI commercial package.

---

© 2025 Splitfin. All rights reserved.