// Secure endpoint to provide Google Maps API key
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Add basic security checks
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // Only allow requests from your domain (adjust as needed)
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001', 
    process.env.NEXT_PUBLIC_SITE_URL,
    // Add your production domain here
  ].filter(Boolean);

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // No NEXT_PUBLIC_ prefix
  
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  res.status(200).json({ key: apiKey });
}