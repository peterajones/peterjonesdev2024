import Link from 'next/link';

export default function UpdatesList(props) {
	return (
		<>
			<div
				className={`updates-bg ${props.modal ? 'open' : 'closed'}`}
				onClick={props.toggleUpdates}
			>
				<div className={`updates-container ${props.modal ? 'open' : 'closed'}`}>
					<div className='modal-title'>Latest Updates</div>
					<div className='updates-container-inner'>
						<div className='update-content'>
							<div className='update-date'>
								December <span className='update-date'>28</span> 2023
							</div>
							<div className='update-details'>
								Finally got around to fixing the{' '}
								<Link href='/news' aria-label='News'>
									News
								</Link>
								RSS feeds. It turns out the signature of the feeds had changed.
								Not a difficult fix, but a bit time consuming. Who does that
								anyway?
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								June <span className='update-date'>12</span> 2022
							</div>
							<div className='update-details'>
								It's been a while! This site has been rebuilt with NextJS. It
								went live back in January 2022 but there were quite a few things
								that needed fixing and I haven't had much time to work on this.
								This morning I added a fix for the syntax highlighting in the
								code blocks. It turns out that NextJS needs a little help for
								Prism to work correctly.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								September <span className='update-date'>09</span> 2020
							</div>
							<div className='update-details'>
								Replaced the NEWSApi feeds with RSS feeds. The first feed comes
								from{' '}
								<Link href='/news/cbc-world-news' aria-label='CBC World News'>
									CBC - World News
								</Link>
								. The NEWSApi was fun to work with but the production version of
								this website required an expensive license, so the alternative
								was to use freely available RSS feeds which of course meant
								rewriting the NEWS section.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								December <span className='update-date'>03</span> 2019
							</div>
							<div className='update-details'>
								The{' '}
								<Link href='/code/snippets' aria-label='Code Snippets'>
									Code Snippet's pages
								</Link>{' '}
								were looking a little long and I wanted to bring the focus to
								the stage area where the widget lives. I added a 'Read More...'
								button to show/hide the detailed description. When the detailed
								description is showing, there is another button to 'Show me the
								code'. Less clutter is better I think.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>29</span> 2019
							</div>
							<div className='update-details'>
								Added an new code snippets widget:{' '}
								<Link href='/code/weather-app' aria-label='Weather App'>
									Weather App
								</Link>
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>23</span> 2019
							</div>
							<div className='update-details'>
								The unnecessary footer was removed. The "latest updates" where
								moved to the top nav. On mobile, the icons were replaced with
								text descriptions. A background color for the modal was added.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>18</span> 2019
							</div>
							<div className='update-details'>
								The top nav item "Code" now maintains active state when
								navigating to individual snippets pages.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>10</span> 2019
							</div>
							<div className='update-details'>
								Refactored the{' '}
								<Link href='/code/pizza-pie' aria-label='Pizza Pie'>
									Pizza Pie
								</Link>{' '}
								project. The pie now has 8 slices (not 10) and 'Starting Over'
								no longer causes a full page refresh.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>07</span> 2019
							</div>
							<div className='update-details'>
								Added this modal to keep track of what is new here - and when it
								was added. These notes come from the repos' commits file.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>06</span> 2019
							</div>
							<div className='update-details'>
								Converted the site to React hooks where possible. This is a big
								refactoring project but results in a more readable and
								maintainable codebase.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								November <span className='update-date'>03</span> 2019
							</div>
							<div className='update-details'>
								Added Google Site Tag to index.html - time to get onboard with
								Google Analytics for this site!
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								October <span className='update-date'>31</span> 2019
							</div>
							<div className='update-details'>
								Added the{' '}
								<Link
									href='/code/password-generator'
									aria-label='Random Password Generator'
								>
									Random Password Generator
								</Link>{' '}
								to the Code section.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								October <span className='update-date'>18</span> 2019
							</div>
							<div className='update-details'>
								This site is now a PWA (Progessive Web App). Check it out on
								your mobile device and add it to your homescreen!
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								October <span className='update-date'>16</span> 2019
							</div>
							<div className='update-details'>
								Dark mode has been added! Click on the sun (or moon) icon in the
								top navigation menu - enjoy! Your settings are saved to
								localStorage.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								September <span className='update-date'>07</span> 2019
							</div>
							<div className='update-details'>
								Tweaks to the{' '}
								<Link href='/code/todo-list' aria-label='Todo List'>
									Todo List
								</Link>{' '}
								styling for Safari on iOS.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								September <span className='update-date'>03</span> 2019
							</div>
							<div className='update-details'>
								Added a FontAwesome icon for the delete button on the{' '}
								<Link href='/code/todo-list' aria-label='Todo List'>
									Todo List
								</Link>{' '}
								- the CSS wasn't cutting it!
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								September <span className='update-date'>02</span> 2019
							</div>
							<div className='update-details'>
								Added react-helmet as a dependency to add unique titles to the
								pages. Hover over the tab in your desktop bowser to check it
								out. Another insightful recommendation from the Lighthouse audit
								tool in Chrome.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								August <span className='update-date'>30</span> 2019
							</div>
							<div className='update-details'>
								Added the{' '}
								<Link href='/code/pagination' aria-label='Pagination Project'>
									Pagination Project
								</Link>{' '}
								(complete with Google Maps) to the Code Snippets page.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								August <span className='update-date'>04</span> 2019
							</div>
							<div className='update-details'>
								Added a zoom-out effect on scroll to the hero images (section
								landing pages) and tweaked some accessibility colour contrasts.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								July <span className='update-date'>23</span> 2019
							</div>
							<div className='update-details'>
								Added a colour changer for the list title and counter for the
								Apple styled{' '}
								<Link href='/code/todo-list' aria-label='Todo List'>
									Todo List
								</Link>
								.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								July <span className='update-date'>18</span> 2019
							</div>
							<div className='update-details'>
								Added code badges to the cards on the{' '}
								<Link href='/code/snippets' aria-label='Code Snippets'>
									Code Snippets
								</Link>{' '}
								page.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								June <span className='update-date'>26</span> 2019
							</div>
							<div className='update-details'>
								Fixes to the mobile nav menu for iPad(Pro).
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								June <span className='update-date'>24</span> 2019
							</div>
							<div className='update-details'>
								Resolved issues with the Netlify{' '}
								<Link href='/contact' aria-label='Contact Form'>
									Contact Form
								</Link>
								.
							</div>
						</div>
						<div className='update-content'>
							<div className='update-date'>
								June <span className='update-date'>24</span> 2019
							</div>
							<div className='update-details'>Initial commit!!!</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
