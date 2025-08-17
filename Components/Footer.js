import { useState, useEffect } from 'react';

const Footer = () => {
	const [year, setYear] = useState(new Date().getFullYear());

	useEffect(() => {
		setYear(new Date().getFullYear());
	}, []);

	return (
		<footer>
			<div className='footer'>Copyright &copy;{year} Peter A. Jones</div>
		</footer>
	);
};

export default Footer;