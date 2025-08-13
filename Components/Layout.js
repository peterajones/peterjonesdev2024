import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
// import UpdatesList from './UpdatesList';
// import Script from 'next/script';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
				<script 
					src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
					async 
					defer
				></script>
				<meta
					name='keywords'
					content='Web Development, HTML5, CSS3, CSS, JavaScript, RSS News Feeds, ReactJS, NextJS'
				/>
			</Head>
			<Navbar />
			<div className='wrapper'>
				{children}	
			</div>
			<Footer />
		</>
	);
};

export default Layout;
