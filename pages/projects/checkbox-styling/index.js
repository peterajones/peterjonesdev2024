import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CodeBlocks from '../../../Components/projects/checkbox-styling/code-blocks';
import Checkboxes from '../../../Components/projects/checkbox-styling/checkboxes';

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
				<title>Peter Jones | Checkbox Styling</title>
			</Head>
			<div className='content'>
				<Link href='/projects' className='backBtn btnLink'>
					Back to Projects
				</Link>
				<div className='btnSpacer'></div>
				<h1>Checkbox Styling</h1>
				<p>
					An example of how checkboxes can be styled with CSS.{' '}
					<span className='btn-widget-description'>
						<br />
						<button onClick={toggleCodeDescription}>
							{codeDescription ? 'Hide description' : 'Read more...'}
						</button>
					</span>
				</p>
				<br />
				<div className='stage checkboxes'>
					<Checkboxes />
				</div>
				<div className='code-content'>
					<div
						className={
							codeDescription
								? 'code-description-open'
								: 'code-description-closed'
						}
					>
						<br />
						<p>
							In React you have to set the state of each checkbox, false being
							unchecked.
						</p>
						<p>
							Each checkbox below has a state of either true or false and that
							state is changed when the checkbox is checked or unchecked.
						</p>
						<p>
							CSS rules are applied depending on the state of each individual
							checkbox.
						</p>
						<p>
							Its more work this way, but you can do much more with state than
							applying a style.
						</p>
						<a
							href='https://github.com/peterajones/styling-checkboxes'
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
			</div>
		</>
	);
}
