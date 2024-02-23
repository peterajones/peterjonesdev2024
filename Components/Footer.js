const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();

	return (
		<footer>
			<div className='footer'>Copyright &copy;{year} Peter A. Jones</div>
		</footer>
	);
};

export default Footer;