import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from "next/legacy/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faSun,
	faMoon,
	faBell,
	faLock,
	faUnlock
} from '@fortawesome/free-solid-svg-icons';
import UpdatesList from './UpdatesList';

library.add(faSun, faMoon, faBell, faLock, faUnlock);

export default function Navbar() {
	const { data: session, status } = useSession();
	const user = session;
	const [theme, setTheme] = useState('');
	const [modal, setModal] = useState(false);

	const toggleTheme = e => {
		if (theme === 'light') {
			localStorage.setItem('theme', 'dark');
			document.body.classList.add('dark');
			setTheme('dark');
		} else {
			localStorage.setItem('theme', 'light');
			document.body.classList.remove('dark');
			setTheme('light');
		}
	};

	const toggleUpdatesModal = () => {
		setModal(!modal);
		!modal
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'unset');
		// resetMenu();
	};

	useEffect(() => {
		const localTheme = localStorage.getItem('theme');
		setTheme(localTheme);

		if (localTheme === null || localTheme === '') {
			localStorage.setItem('theme', 'light');
			setTheme('light');
		} else if (localTheme === 'dark') {
			document.body.classList.add('dark');
		}
	}, []);

	return (
		<>
			<nav className='nav'>
				<div className='navContent'>
					<div className='logo'>
						{theme === 'light' ? (
							<Link href='/' legacyBehavior>
								<Image
									src='/images/my-logo.png'
									alt='logo'
									width={224}
									height={60}
								/>
							</Link>
						) : (
							<Link href='/' legacyBehavior>
								<Image
									src='/images/my-logo-dark.png'
									alt='logo'
									width={224}
									height={60}
								/>
							</Link>
						)}
					</div>
					<div className='topNavLinks'>
						<Link href='/projects'>Projects</Link>
						<Link href='/news'>News</Link>
						<Link href='/contact'>Contact</Link>
						{session ? (
							<Link href='/account' className='avatar-link' legacyBehavior>
								{session.user.image ? (
									<Image
										src={session.user.image}
										alt='avatar'
										className='avatar'
									/>
								) : (
									'Account'
								)}
							</Link>
						) : (
							''
						)}
						<button
							name='toggle theme'
							title='Toggle Theme'
							aria-label='Toggle Theme'
							className='faIcon'
							onClick={toggleTheme}
						>
							{theme === 'light' ? (
								<FontAwesomeIcon icon={faSun} />
							) : (
								<FontAwesomeIcon icon={faMoon} />
							)}
						</button>
						{!session ? (
							<button
								name='toggle session'
								title='Session SignIn'
								aria-label='Session SignIn'
								className='faIcon'
								onClick={() => signIn()}
							>
								{theme === 'light' ? (
									<FontAwesomeIcon icon={faLock} />
								) : (
									<FontAwesomeIcon icon={faLock} />
								)}
							</button>
						) : (
							<button
								name='toggle session'
								title='Session SignOut'
								aria-label='Session SignOut'
								className='faIcon'
								onClick={() => signOut()}
							>
								{theme === 'light' ? (
									<FontAwesomeIcon icon={faUnlock} />
								) : (
									<FontAwesomeIcon icon={faUnlock} />
								)}
							</button>
						)}
						<button
							name='toggle updates modal'
							title='Latest Updates'
							aria-label='Toggle Updates Modal'
							className='faIcon'
							onClick={() => toggleUpdatesModal()}
						>
							{theme === 'light' ? (
								<FontAwesomeIcon icon={faBell} />
							) : (
								<FontAwesomeIcon icon={faBell} />
							)}
						</button>
					</div>
				</div>
			</nav>
			<UpdatesList modal={modal} toggleUpdates={toggleUpdatesModal} />
		</>
	);
}

export async function getServerSideProps(context) {
	try {
		// client.db() will be the default database passed in the MONGODB_URI
		// You can change the database by calling the client.db() function and specifying a database like:
		// const db = client.db("myDatabase");
		// Then you can execute queries against your database like so:
		// db.find({}) or any of the MongoDB Node Driver commands
		await clientPromise;
		return {
			props: { isConnected: true }
		};
	} catch (e) {
		console.error(e);
		return {
			props: { isConnected: false }
		};
	}
}
