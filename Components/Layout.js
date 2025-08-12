import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
// import UpdatesList from './UpdatesList';
import Script from 'next/script';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
				{/* <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALw2Ka68OgdctxI1xicaOiaQQKSQeiN4k&libraries=places" loading="async" defer></script> */}
				<meta
					name='keywords'
					content='Web Development, HTML5, CSS3, CSS, JavaScript, RSS News Feeds, ReactJS, NextJS'
				/>
			</Head>
			{/* <Script src={"https://maps.googleapis.com/maps/api/js?key=`process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY`&libraries=places"} /> */}
			<Navbar />
			<div className='wrapper'>
				{children}	
			</div>
			<Footer />
		</>
	);
};

export default Layout;
