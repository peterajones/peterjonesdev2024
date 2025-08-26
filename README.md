This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Troubleshooting

### React Hydration Errors ✅ FIXED

#### Problem: React Error #418 - Hydration Failed
**Cause:** Server-side and client-side rendering produced different outputs due to:
- `typeof window !== 'undefined'` checks inside `useEffect` hooks
- `new Date()` calls during component render (different server/client times)
- `localStorage` access during initial render

**Solution Implemented:**
1. **Removed unnecessary window checks:** `useEffect` only runs on client-side, so `typeof window` checks are redundant
2. **Fixed Footer date rendering:** Moved `new Date()` to `useEffect` to ensure consistent initial rendering
3. **Fixed localStorage hydration:** Set consistent default state values, only read localStorage in `useEffect`
4. **Fixed Navbar theme state:** Initialize with consistent default ('light'), update via `useEffect`

```javascript
// ❌ Before - causes hydration mismatch
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return <footer>Copyright &copy;{year}</footer>;
};

// ✅ After - consistent hydration
const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return <footer>Copyright &copy;{year}</footer>;
};
```

### React Hooks Order Violation ✅ FIXED

#### Problem: "React has detected a change in the order of Hooks"
**Cause:** Adding new hooks or changing hooks order between renders

**Solution:** Maintained consistent hooks order by consolidating `useEffect` hooks instead of adding new ones.

### Google Maps API Issues ✅ FIXED

#### Problem: `google api is already presented`
**Cause:** Multiple `LoadScript` components trying to load Google Maps API simultaneously

**Solution Implemented - MapsProvider Pattern:**
1. **Created centralized MapsProvider:** Single `LoadScript` component in `Components/MapsProvider.js`
2. **Added to Layout:** Wraps entire app with one Maps instance
3. **Removed individual LoadScript components** from WeatherApp and pagination components

```javascript
// Components/MapsProvider.js
import { LoadScript } from '@react-google-maps/api';

const MapsProvider = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
      preventGoogleFontsLoading={true}
      region="US"
      language="en"
    >
      {children}
    </LoadScript>
  );
};

// Components/Layout.js
<MapsProvider>
  <Navbar />
  <div className='wrapper'>{children}</div>
  <Footer />
</MapsProvider>
```

#### Problem: Google Maps CSP (Content Security Policy) test errors
**Cause:** Missing or restrictive Content Security Policy headers

**Solution Implemented:**
Added CSP headers to `next.config.js`:

```javascript
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://maps.gstatic.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
            img-src 'self' data: https: blob:;
            connect-src 'self' https://api.openweathermap.org https://maps.googleapis.com https://jsonplaceholder.typicode.com;
            frame-src 'self' https://maps.google.com;
          `.replace(/\s{2,}/g, ' ').trim()
        }
      ]
    }
  ]
}
```

### Next.js Link Component Warnings ✅ FIXED

#### Problem: "Function components cannot be given refs"
**Cause:** Using deprecated `legacyBehavior` prop with Next.js Link components

**Solution:** Removed unnecessary `legacyBehavior` props from Link components wrapping Image elements in Navbar.

### Environment Variables

Ensure all required environment variables are set:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For Google Maps and Places API
- `NEXT_PUBLIC_OPENWEATHER_API_KEY` - For weather data
- `NEXT_PUBLIC_NEWSAPI_KEY` - For news feeds

## New Project Added: Currency Converter

### Overview
Successfully converted and integrated the Currency Converter project from a standalone Node.js/Express application into the Next.js portfolio structure. This financial tool allows users to convert between 30+ world currencies using real-time exchange rates.

### Key Features
- **Smart Currency Management**: Users can build custom conversion lists by adding/removing currencies
- **Dynamic Base Currency System**: Any currency becomes the base when you type in its input field
- **Real-time Conversions**: Live calculations with proper number formatting as you type
- **Persistent User Preferences**: localStorage remembers selected currencies between sessions
- **API Rate Limiting Protection**: Graceful fallback to demo rates when API limits are exceeded
- **Mobile-Responsive Design**: Optimized layout for all screen sizes
- **30+ Major Currencies**: Complete with country flag icons for easy identification

### Development History
- **Source**: Migrated from https://github.com/peterajones/nodejs-currency-converter
- **Architecture**: Vanilla JavaScript DOM manipulation → React hooks and state management
- **API Strategy**: Express server endpoint → Direct Next.js client-side API calls
- **Performance**: Optimized to only call Exchange Rates API when users enter amounts (prevents unnecessary rate limiting)
- **Styling**: Custom CSS → SASS with `.cc` namespace to prevent conflicts with other projects
- **Error Handling**: Robust fallback system for API failures and rate limits

### Technical Implementation
- **Component**: `Components/projects/currency-converter/CurrencyConverter.js`
- **Page**: `pages/projects/currency-converter/index.js`
- **Styling**: `styles/partials/_currency-converter.scss`
- **API**: Exchange Rates API (exchangeratesapi.io) with `NEXT_PUBLIC_EXCHANGE_RATES_API_KEY`

### Usage
1. Visit `/projects/currency-converter` to access the tool
2. Default currencies (CAD, USD, EUR, JPY) load automatically on first visit
3. Click "Add Currency" to browse and select from 30+ available currencies
4. Type any amount in any currency field to see live conversions across all selected currencies
5. Remove currencies with the × button, reset amounts, or clear the entire list as needed
6. Your currency selections are automatically saved and restored on future visits

### Current Status
- ✅ Fully functional with complete React conversion
- ✅ Responsive design with proper mobile optimization
- ✅ localStorage persistence working correctly
- ✅ Rate limiting protection with demo mode fallback
- ⏸️ Live API calls temporarily paused due to monthly rate limit (resets next month)

### Google Maps API Security ✅ SECURED (2025)

**Security Method:** Google Cloud Console domain restrictions  
**Implementation:** Simple `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` with HTTP referrer restrictions

**Security Features:**
- ✅ **Domain Restrictions**: API key only works from allowed domains
- ✅ **API Restrictions**: Limited to Maps JavaScript API, Places API, Geocoding API  
- ✅ **Google Validation**: Google's servers validate referrer domain on every call
- ✅ **Simple Implementation**: Clean code without unnecessary complexity

**Key Insight:** API keys visible in browser are secure when properly restricted at the Google Cloud Console level. Domain validation is the real security barrier.

---

## Documentation, videos, how-to's etc...
1. [YouTube tutorial](https://www.youtube.com/watch?v=AdcktATbd-I)
2. [NextAuth.js Documentation](https://next-auth.js.org/)
3. [Secure your local development server with HTTPS](https://anmagpie.medium.com/secure-your-local-development-server-with-https-next-js-81ac6b8b3d68)
4. [next-auth-example](https://github.com/nextauthjs/next-auth-example/blob/main/pages/api/auth/%5B...nextauth%5D.js)
5. [Local development server with HTTPS](https://anmagpie.medium.com/secure-your-local-development-server-with-https-next-js-81ac6b8b3d68)