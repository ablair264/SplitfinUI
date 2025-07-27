# Google Maps API Troubleshooting Guide

## Common Issues and Solutions

### 1. ApiTargetBlockedMapError

**Error Message:** "Google Maps JavaScript API error: ApiTargetBlockedMapError"

**Cause:** Your API key is blocked from being used on the current domain.

**Solutions:**

#### A. Check API Key Restrictions
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services → Credentials**
3. Click on your API key
4. Check **Application restrictions**

#### B. Update HTTP Referrer List
Add these patterns to your allowed referrers:

```
# Local development
http://localhost:3000/*
http://localhost:5173/*
http://localhost:5174/*
http://127.0.0.1:*/*

# Vercel deployments
https://*.vercel.app/*
https://*-*.vercel.app/*
https://splitfin-ui-website.vercel.app/*
https://splitfin-ui-website-*.vercel.app/*

# Your custom domain (if you have one)
https://yourdomain.com/*
https://www.yourdomain.com/*
```

#### C. Remove Restrictions (Temporary)
For testing, temporarily set:
- **Application restrictions:** None
- **API restrictions:** Don't restrict key

**⚠️ Warning:** Remember to re-add restrictions after testing!

### 2. RefererNotAllowedMapError

**Cause:** The domain is not in the allowed referrers list.

**Solution:** Add your domain to the HTTP referrers list (see above).

### 3. InvalidKeyMapError

**Cause:** The API key is invalid or deleted.

**Solution:** 
1. Verify the key in Google Cloud Console
2. Check if billing is enabled
3. Regenerate the key if needed

### 4. API Not Enabled

**Error:** "Google Maps JavaScript API has been disabled for this API key"

**Solution:**
1. Go to **APIs & Services → Library**
2. Search for "Maps JavaScript API"
3. Click **Enable**

### 5. Billing Not Enabled

**Error:** "You must enable Billing on the Google Cloud Project"

**Solution:**
1. Go to **Billing** in Google Cloud Console
2. Link a billing account
3. Note: Google provides $200 free credit monthly

## Quick Checklist

- [ ] API key created in Google Cloud Console
- [ ] Maps JavaScript API enabled
- [ ] Billing account linked (even for free tier)
- [ ] Correct referrer restrictions added
- [ ] Environment variable named `VITE_GOOGLE_MAPS_API_KEY`
- [ ] Deployed with environment variable in Vercel
- [ ] Waited 5 minutes for changes to propagate

## Using the Fallback Component

While setting up Google Maps, use the fallback component:

```jsx
import { CustomerMapFallback } from '@/components/CustomerMap';

function MyComponent() {
  return (
    <CustomerMapFallback 
      customers={customerData}
      mapHeight="600px"
    />
  );
}
```

## Need More Help?

- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Error Messages Reference](https://developers.google.com/maps/documentation/javascript/error-messages)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
