# Deploying to Vercel

## Quick Deploy (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/splitfin-showcase.git
   git push -u origin main
   ```

2. **Deploy with Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! 🎉

## Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Set up and deploy? `Y`
   - Which scope? `Select your account`
   - Link to existing project? `N`
   - What's your project's name? `splitfin-showcase`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

## Environment Variables

If you need to add environment variables:

1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables
4. Redeploy

## Custom Domain

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

- **Build fails**: Check `npm run build` works locally
- **Styles missing**: Ensure all CSS imports are correct
- **Components not rendering**: Check React hydration errors in console

## Performance Tips

- Enable Vercel Analytics for performance monitoring
- Use Next.js Image component for optimized images
- Enable ISR (Incremental Static Regeneration) for dynamic content