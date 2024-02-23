import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CodeBlocks from '../../../Components/projects/rollup-counter/code-blocks';
import RollupCounter from '../../../Components/projects/rollup-counter/RollupCounter';

export default function Index() {
	const [, setDidMount] = useState(false);
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
				<title>Peter Jones | Rollup Counter</title>
			</Head>
			<div className='content'>
				<Link href='/projects' className='backBtn btnLink'>
					Back to Projects
				</Link>
				<div className='btnSpacer'></div>
				<h1>Javascript Rollup Counter</h1>
				<p>
					This is a vanilla Javascript version of a{' '}
					<code className='inline'>react-transition-group</code> animation.{' '}
					<br />
					<span className='btn-widget-description'>
						<button onClick={toggleCodeDescription}>
							{codeDescription ? 'Hide description' : 'Read more...'}
						</button>
					</span>
				</p>
				<br />
				<div className='stage'>
					<RollupCounter />
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
							In React I have set the initial state of the component to{' '}
							<code className='inline'>date: new Date()</code> and when the
							component mounts I start the clock ticking with{' '}
							<code className='inline'>
								this.clock = setInterval(() =&gt; this.count(), 1000);
							</code>
							.
						</p>
						<p>
							When the page changes I set{' '}
							<code className='inline'>clearInterval(this.clock);</code> in the{' '}
							<code className='inline'>componentWillUnmount</code> lifecycle
							component.
						</p>
						<a
							href='https://github.com/peterajones/rolloup-counter'
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
