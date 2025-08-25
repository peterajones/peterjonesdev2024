import { useState } from 'react';
import Script from 'next/script';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import CodeBlocks from '../../../Components/projects/currency-converter/code-blocks';

const CurrencyConverter = dynamic(() => import('../../../Components/projects/currency-converter/CurrencyConverter'), {
	ssr: false,
	loading: () => <div className='cc'><div className='container'><h1>Loading Currency Converter...</h1></div></div>
});

export default function Index() {
	const [codeDescription, setCodeDescription] = useState(false);
	const [codeBlocks, setCodeBlocks] = useState(false);

	const toggleCodeDescription = () => {
		setCodeDescription(!codeDescription);
	};

	const toggleCodeBlocks = () => {
		setCodeBlocks(!codeBlocks);
	};

	const apikey = process.env.NEXT_PUBLIC_EXCHANGE_RATES_API_KEY;
	return (
		<>
			<Head>
				<title>Peter Jones | Currency Converter</title>
			</Head>
			<div className='content'>
				<Link href='/projects' className='btnLink'>
					Back to Projects
				</Link>
				<div className='btnSpacer'></div>
				<h1>Currency Converter</h1>
				<p>
					A handy currency converter. Build your own lists of currencies to compare several curriencies at the same time!{' '}
					<span className='btn-widget-description'>
						<button onClick={toggleCodeDescription}>
							{codeDescription ? 'Hide description' : 'Read more...'}
						</button>
					</span>
				</p>
				<br />
				<div className='stage'>
					<CurrencyConverter />
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
						<p>This currency converter uses the Exchange Rates API to provide real-time currency conversion:</p>
						<ul>
							<li>
								The{' '}
								<a
									href='https://exchangeratesapi.io/'
									target='_new'
								>
									Exchange Rates API
								</a>{' '}
								provides up-to-date exchange rates for 30+ currencies with daily updates.
							</li>
						</ul>
						<p>
							The Exchange Rates API is free to use with the usual requirement that
							you need to sign up and get an API key. There are some
							restrictions on the number of calls per day, but for
							a small app like this one it is not an issue.
						</p>
						<h4>How does this work?</h4>
						<p>
							The currency converter allows you to build your own custom list of currencies
							to compare. You can add and remove currencies from your list, and the app
							will remember your preferences using localStorage. When you enter an amount
							in any currency, it automatically calculates the equivalent amounts in all
							other currencies in your list.
						</p>
						<p>
							The app features a dynamic base currency system - whichever currency you
							type an amount into becomes the new base currency, and all other amounts
							update automatically based on the current exchange rates.
						</p>
						<p>
							Exchange rates are updated daily and fetched directly from the
							Exchange Rates API. The app displays the current date of the exchange
							rates so you know how fresh the data is.
						</p>
						<p>
							Currency amounts are formatted with proper localization and you can easily
							reset all amounts or clear your entire currency list using the control buttons.
						</p>
						<p>
							The "Add Currency" button slides out a full list of available currencies
							with country flags for easy identification. Selected currencies are disabled
							to prevent duplicates in your conversion list.
						</p>
						<p>
							The app includes 30+ major world currencies and uses localStorage to
							persist your currency selection between sessions, so your preferred
							currencies are remembered when you return.
						</p>
						<p>Have fun!</p>

						<a
							href='https://github.com/peterajones/vanilla-currency-converter'
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
				</div>
				<CodeBlocks
					codeBlocks={codeBlocks}
					toggleCodeBlocks={toggleCodeBlocks}
				/>
			</div>
		</>
	);
}
