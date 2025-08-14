import React, { useState } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

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
	)
}

export default React.memo(Maps);
