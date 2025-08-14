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

### Google Maps API Issues

#### Problem: `Google Maps JavaScript API warning: InvalidKey`
**Solution:** Ensure your API key is properly configured in environment variables:
- Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here` to `.env.local`
- For Netlify deployment, add the same environment variable in Site Settings → Environment Variables
- Verify your API key has the correct permissions for Maps JavaScript API and Places API

#### Problem: `Google Maps JavaScript API has been loaded directly without loading=async`
**Solution:** Configure LoadScript components with async loading:
```javascript
<LoadScript 
  googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
  async={true}
  defer={true}
  loadingElement={<div>Loading Maps...</div>}
>
```

#### Problem: `google api is already presented`
**Solution:** This occurs when multiple components try to load the Google Maps API. Ensure:
- Remove any global Maps API script tags from `Layout.js`
- Use individual `LoadScript` components in each page/component that needs Maps
- Avoid loading the API globally if using `@react-google-maps/api`

### Hydration Errors

#### Problem: `Hydration failed because the initial UI does not match what was rendered on the server`
**Solution:** For components using Google Maps or browser-only APIs, use Next.js dynamic imports:

```javascript
import dynamic from 'next/dynamic';

const WeatherApp = dynamic(() => import('../components/WeatherApp'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

Alternatively, implement client-side only rendering:
```javascript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);

if (!mounted) {
  return <div>Loading...</div>;
}
```

### Environment Variables

Ensure all required environment variables are set:
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For Google Maps and Places API
- `NEXT_PUBLIC_OPENWEATHER_API_KEY` - For weather data
- `NEXT_PUBLIC_NEWSAPI_KEY` - For news feeds

## Documentation, videos, how-to's etc...
1. [YouTube tutorial](https://www.youtube.com/watch?v=AdcktATbd-I)
2. [NextAuth.js Documentation](https://next-auth.js.org/)
3. [Secure your local development server with HTTPS](https://anmagpie.medium.com/secure-your-local-development-server-with-https-next-js-81ac6b8b3d68)
4. [next-auth-example](https://github.com/nextauthjs/next-auth-example/blob/main/pages/api/auth/%5B...nextauth%5D.js)
5. [Local development server with HTTPS](https://anmagpie.medium.com/secure-your-local-development-server-with-https-next-js-81ac6b8b3d68)