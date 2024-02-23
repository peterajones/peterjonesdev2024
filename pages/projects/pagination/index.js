import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Data from '../../../Components/projects/pagination/Data';
import CodeBlocks from '../../../Components/projects/pagination/code-blocks';

export default function Index() {
	const [didMount, setDidMount] = useState(false);
	const [codeDescription, setCodeDescription] = useState(false);
	const [codeBlocks, setCodeBlocks] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		setDidMount(true);
	}, []);

	const toggleCodeDescription = () => {
		setCodeDescription(!codeDescription);
	};

	const toggleCodeBlocks = () => {
		setCodeBlocks(!codeBlocks);
	};

	return (
		<>
			<Head>
				<title>Peter Jones | Pagination</title>
			</Head>
			<div className='content'>
				<Link href='/projects' className='btnLink'>
					Back to Projects
				</Link>
				<div className='btnSpacer'></div>
				<h1>Pagination</h1>
				<p>
					Using a REST API and Google Maps in React.{' '}
					<span className='btn-widget-description'>
						<button onClick={toggleCodeDescription}>
							{codeDescription ? 'Hide description' : 'Read more...'}
						</button>
					</span>
				</p>
				<br />
				<div className='stage'>
					<Data />
				</div>
				<div
					className={
						codeDescription
							? 'code-description-open'
							: 'code-description-closed'
					}
				>
					<br />
					<p>
						I wanted to re-vist pagination so I took a vanilla JS project and
						converted it for ReactJS. The demo below is my ReactJS version.
					</p>
					<p>
						After fetching the data, I styled a 'card' to display the fetched
						data. While doing this I noticed that the user's data included
						geographical coordiantes, so why not add Google maps to the cards!
					</p>
					<p>
						The coordiantes are of course bogus, but they are distinct. Most of
						them are in the middle of some ocean or Antarctica, but if you look
						closely you will see that each map is distinct.
					</p>
					<p>
						The challenge with the maps was to be able to display more than one
						map per page.
					</p>
					<p>
						In the React demo below, I'm using <code>axios</code> to fetch the
						data from{' '}
						<a href='https://jsonplaceholder.typicode.com/users' target='_new'>
							https://jsonplaceholder.typicode.com/users
						</a>{' '}
						and React Hooks to display the data. The pagination is different
						from the original in that it is rendered programatically.
					</p>
					<a
						href='https://github.com/peterajones/pagination'
						target='_new'
						className='github-link'
					>
						<span>Get it on GitHub</span>
						<span className='github-getit'>
							<div className='github-logo' />
						</span>
					</a>
					<span className='btn-widget-code'>
						<button onClick={toggleCodeBlocks}>
							{codeBlocks ? 'Hide the code' : 'Show me the code'}
						</button>
					</span>
				</div>
				<CodeBlocks
					codeBlocks={codeBlocks}
					toggleCodeBlocks={toggleCodeBlocks}
				/>
			</div>
		</>
	);
}
