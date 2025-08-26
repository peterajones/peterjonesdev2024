import { LoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const libraries = ['places'];

const MapsProvider = ({ children }) => {
	const [apiKey, setApiKey] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Fetch API key from secure endpoint
		fetch('/api/google-maps-key')
			.then(res => {
				if (!res.ok) throw new Error('Failed to get Maps API key');
				return res.json();
			})
			.then(data => setApiKey(data.key))
			.catch(err => {
				console.error('Error loading Maps API key:', err);
				setError(err.message);
			});
	}, []);

	if (error) {
		return <div>Error loading Google Maps: {error}</div>;
	}

	if (!apiKey) {
		// return <div>Loading Google Maps...</div>;
	}

	return (
		<LoadScript
			googleMapsApiKey={apiKey}
			libraries={libraries}
			onError={(error) => console.error('Google Maps LoadScript error:', error)}
			preventGoogleFontsLoading={true}
			region="US"
			language="en"
		>
			{children}
		</LoadScript>
	);
};

export default MapsProvider;