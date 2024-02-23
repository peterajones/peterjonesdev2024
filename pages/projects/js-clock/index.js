import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import CodeBlocks from '../../../Components/projects/js-clock/code-blocks';
import Clock from '../../../Components/projects/js-clock/clock';

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

	return <>
        <Head>
            <title>Peter Jones | Twelve Hour Clock</title>
        </Head>
        <div className='content'>
            <Link href='/projects' className='backBtn'>
                Back to Projects
            </Link>
            <div className='btnSpacer'></div>
            <h1>Twelve Hour Clock in React</h1>
            <p>
                Here is a simple clock that generates the current time using the
                JavaScript <code className='inline'>Date</code> object.{' '}
                <span className='btn-widget-description'>
                    <br />
                    <button onClick={toggleCodeDescription}>
                        {codeDescription ? 'Hide description' : 'Read more...'}
                    </button>
                </span>
            </p>
            <br />
            <div className='stage clock'>
                <Clock />
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
                        href='https://github.com/peterajones/Twelve-Hour-Digital-Clock'
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
    </>;
}
