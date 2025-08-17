import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const MapsProvider = ({ children }) => {
	return (
		<LoadScript
			googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
			libraries={libraries}
			loadingElement={<div>Loading Google Maps...</div>}
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