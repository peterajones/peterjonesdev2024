import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Banner from '../Components/Banner';

export default function Home() {
	// const { data: session } = useSession();
	// console.log(session);
	// if (session) {
	// 	const { user } = session.user;
	// 	console.log(session.user.name);
	// }
	const [didMount, setDidMount] = useState(false);
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
		setDidMount(true);
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	function handleScroll() {
		let scroll = window.scrollY;
		setScroll(scroll);
	}

	return (
		<>
			<Head>
				<title>Peter Jones | Homepage</title>
			</Head>
			<Banner src='/images/banners/CanadianFlagReflection.jpg' />
			<div className='content'>
				<div className={`fade-in ${didMount && 'visible'}`}>
					<h1 style={{ display: 'none' }}>Home Page</h1>

					<section className='section section-one'>
						<h2>Welcome</h2>
						<p>Thank you for visiting my website.</p>
						<p>
							I am a Front End Web Developer in Toronto and I have been building
							websites for more than 10 years. My background is making websites
							with HTML, CSS and JavaScript from Photoshop mockups. I have
							worked with PHP, mySql, Wordpress, jQuery and many other
							technologies. When mobile devices arrived, I learned responsive
							web design with fluid grids as well as the importance of web
							standards, cross browser compatibility and accessibility.
						</p>
						<p>
							With the arrival of task managers such as Gulp and Grunt,
							minifying CSS and Javascript as well as optimizing images was no
							longer a chore and the benefits of faster load times became
							obvious using these techniques. Flexbox and CSS Grid gave us the
							ability to design web pages in ways that we could never have
							imagined. At any rate, the industry has moved on and new
							technologies have appeared. React, Angular, Vue and Gatsby are
							just a few that are changing the way we now present content
							blazingly fast.
						</p>
						<p>
							Staying on top of the latest technologies and techniques is
							challenging but I want to keep building websites using the latest
							and greatest. This site is built using React - a JavaScript
							library for building user interfaces.
						</p>
					</section>
					<section className='section section-two'>
						<div className='left'>
							<h3>So what&apos;s here?</h3>
							<p>
								The first thing to understand about React is that it is
								component based. This makes it easy to build reusable elements.
							</p>
							<p>
								You can design simple views for each state of the application
								and React will update and render only the components that are
								affected when the state changes. That&apos;s one way that React
								seems to load so quickly - it only reloads the piece of the page
								that has changes and not the whole page.
							</p>
							<p>
								This is not a tutorial, but other concepts such as state and
								props are important to understand. When I was building the
								mobile menu I wanted to add an animation to the hamburger menu.
								Simply attaching an event listener to an element with{' '}
								<code>getElementById</code> no longer works the way it used to
								be done. You need to <code>setState</code> for that element so
								that when an event is clicked for example, the state is changed
								and the element is re-rendered adding a class.
							</p>
							<p>
								I have tried to explain more on this in the Code Snippets
								Section.
							</p>
						</div>
						<div className='right' />
					</section>
					<section className='section section-three'>
						<div className='left' />
						<div className='right'>
							<h3>Code Snippets Section</h3>
							<p>
								In this section I have converted some past side projects written
								in HTML, CSS and Javascript.
							</p>
							<p>
								The original code is shown in the syntax highlighting sections -
								usually one section for each. For the syntax highlighting I used
								Prism which is a lightweight, extensible syntax highlighter.
								Check out the{' '}
								<a href='https://prismjs.com/' target='_new'>
									Prism website
								</a>{' '}
								to learn more.
							</p>
							<p>
								If you want to see how the original snippets worked, you can
								copy/paste from the snippets into separate files (i.e.
								index.html, styles.css and scripts.js) and run them in a
								browser.
							</p>
							<p>
								There is a short explanation as to what was required to convert
								the snippet for use with React at the top of each snippet&apos;s
								page.
							</p>
						</div>
					</section>
					<section className='section section-four'>
						<div className='left'>
							<h3>News Feeds Section</h3>
							<p>I have always added a news feeds section to my site.</p>
							<p>
								In React we can use the <code>Fetch API</code> or even a node
								package such as <code>axios</code> to fetch JSON data from the
								Internet and display it on our site.
							</p>
							<p style={{ textDecoration: 'line-through' }}>
								For the news feed on this site I am pulling the data from the{' '}
								<a href='https://newsapi.org/' target='_new'>
									News API
								</a>
								.
							</p>
							<p>
								Turns out the NewsAPI was way too expensive for this site, so
								I&apos;m pulling some RSS feeds from the{' '}
								<a href='https://www.cbc.ca/rss/' target='_new'>
									CBC
								</a>
								. Thanks{' '}
								<a href='https://www.cbc.ca/' target='_new'>
									CBC!
								</a>
							</p>
						</div>
						<div className='right' />
					</section>
					<section className='section section-five'>
						<div className='left' />
						<div className='right'>
							<h3>Contact Form Section</h3>
							<p>
								Every website should have a contact form, even a simple one.
							</p>
							<p>
								I am hosting this site with{' '}
								<a href='https://www.netlify.com/' target='_new'>
									Netlify
								</a>{' '}
								and they provide a (mostly) simple way to add a contact form.
							</p>
							<p>
								Go ahead - <Link href='/contact'>send me a message</Link>. I
								promise to get back to you.
							</p>
						</div>
					</section>
				</div>
			</div>
		</>
	);
}
