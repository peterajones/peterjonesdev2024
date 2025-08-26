// Server-side proxy for Google Maps API calls
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { service, ...params } = req.query;
  
  // Whitelist allowed services
  const allowedServices = ['geocode', 'places', 'directions'];
  if (!allowedServices.includes(service)) {
    return res.status(400).json({ error: 'Invalid service' });
  }

  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY; // No NEXT_PUBLIC_ prefix
    const baseUrl = 'https://maps.googleapis.com/maps/api';
    
    const queryString = new URLSearchParams({
      ...params,
      key: apiKey
    }).toString();
    
    const response = await fetch(`${baseUrl}/${service}/json?${queryString}`);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Google Maps API error:', error);
    res.status(500).json({ error: 'Failed to fetch from Google Maps API' });
  }
}