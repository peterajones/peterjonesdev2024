import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '260px',
  height: '220px'
};


function Maps(props) {
	const [isClient, setIsClient] = useState(false);
	
	useEffect(() => {
		setIsClient(true);
	}, []);

	const center = {
		lat: parseFloat(props.lat),
		lng: parseFloat(props.lng)
	};

	if (!isClient) {
		return <div style={containerStyle}>Loading map...</div>;
	}

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={2}
		>
			<Marker
				title={props.name}
				name={props.location}
				position={{
					lat: parseFloat(props.lat),
					lng: parseFloat(props.lng)
				}}
			/>
		</GoogleMap>
	)
}

export default React.memo(Maps);
