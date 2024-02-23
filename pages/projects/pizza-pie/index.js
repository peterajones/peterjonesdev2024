import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CodeBlocks from '../../../Components/projects/pizza-pie/code-blocks';
import PizzaSlices from '../../../Components/projects/pizza-pie/PizzaSlices';

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
				<title>Peter Jones | Pizza Pie</title>
			</Head>
			<div className='content'>
				<Link href='/projects' className='backBtn btnLink'>
					Back to Projects
				</Link>
				<div className='btnSpacer'></div>
				<h1>Pizza Pie</h1>
				<p>
					This was a prototype of an idea for a client.{' '}
					<span className='btn-widget-description'>
						<br />
						<button onClick={toggleCodeDescription}>
							{codeDescription ? 'Hide description' : 'Read more...'}
						</button>
					</span>
				</p>
				<br />
				<div className='stage pizza-pie'>
					<PizzaSlices />
				</div>
				<div className='code-content'>
					<div
						className={
							codeDescription
								? 'code-description-open'
								: 'code-description-closed'
						}
					>
						<p>
							The client wanted to graphically show how many orders / vists were
							left until a free pizza was available.
						</p>
						<p>
							Converting this for React was just a matter of setting the initial
							state to <code className='inline'>slices: 0</code>.
						</p>
						<p>
							Changing the number of slices fires an{' '}
							<code className='inline'>onChange</code> event which changes the
							number of slices set in state
						</p>
						<p>
							Knowing the number of slices means that I know which slice(s) I
							need to target with the CSS and provide an animation.
						</p>
						<p>Try it out!</p>
						<a
							href='https://github.com/peterajones/pizza-pie-revealed'
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
