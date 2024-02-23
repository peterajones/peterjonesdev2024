import { useState, useEffect } from 'react';

export default function Clock() {
	const [date, setDate] = useState(null);

	useEffect(() => {
		const interval = setInterval(count, 1000);
		function count() {
			setDate(new Date().toLocaleTimeString());
		}
		setDate(interval);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<h3>
			<span className='clock fade-in-text'>The time is: {date}</span>
		</h3>
	);
}
