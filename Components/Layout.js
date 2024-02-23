import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import UpdatesList from './UpdatesList';

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
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
