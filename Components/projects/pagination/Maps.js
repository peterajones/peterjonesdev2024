import React, { useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '260px',
  height: '220px'
};


function Maps(props) {
	const center = {
		lat: parseInt(props.lat),
		lng: parseInt(props.lng)
	};

	return (
		<LoadScript
			googleMapsApiKey = {process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY}
		>
		<GoogleMap
			mapContainerStyle={containerStyle}
      center={center}
			zoom={2}
		>
			<Marker
				title={props.name}
				name={props.location}
				position={{
					lat: parseInt(props.lat),
					lng: parseInt(props.lng)
				}}
			/>
		</GoogleMap>
		</LoadScript>
	)
}

export default React.memo(Maps);
