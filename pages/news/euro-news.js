import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from "next/legacy/image";
import styles from '../../styles/News.module.scss';

const FEED_URL =
	'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19794221';
const CORS_PROXY = 'https://my-dev-proxy-server.herokuapp.com/';
const URL_TO_FETCH = CORS_PROXY + FEED_URL;

const CNBCEuroNews = () => {
	const [theme, setTheme] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		setTheme(theme);
		fetch(URL_TO_FETCH)
			.then(response => response.text())
			.then(xmlData => {
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(xmlData, 'application/xml');
				const items = xmlDoc.querySelectorAll('item');

				setIsLoading(false);
				let html = ``;

				items.forEach(item => {
					const titleElement = item.querySelector('title');
					const linkElement = item.querySelector('link');
					const descriptionElement = item.querySelector('description');
					const pubDateElement = item.querySelector('pubDate');
					const guidElement = item.querySelector('guid');

					// Check if the elements exist before accessing their textContent
					const title = titleElement ? titleElement.textContent : 'N/A';
					const link = linkElement ? linkElement.textContent : 'N/A';
					const description = descriptionElement
						? descriptionElement.textContent
						: 'N/A';
					const pubDate = pubDateElement ? pubDateElement.textContent : 'N/A';
					// const guid = guidElement ? guidElement.textContent : 'N/A';

					html += `
						<article>
							<h3>
								<a href=${link}  class=${styles.title} target="_new">${title}</a>
							</h3>
							<p>
								<span class=${styles.pubData}>${pubDate}</span>
								${description}
							</p>
						</article>
					`;
				});
				const articles = document.getElementsByClassName('feeds-container')[0];
				articles.insertAdjacentHTML('beforeend', html);
				let imgEl = document.querySelectorAll('img');
				for (let i = 1; i < imgEl.length; i++) {
					imgEl[i].setAttribute('loading', 'lazy');
				}
			})
			.catch(error => console.error('Error fetching RSS feed:', error));
	}, []);

	return (
		<>
			<Head>
				<title>Peter Jones | CNBC Euro News</title>
			</Head>
			<div className='feeds-container content'>
				<div className={styles.newsfeedHeader}>
					<Image
						src='/images/news/euronews.jpg'
						alt='cnbc euro news'
						width='100'
						height='100'
						layout='fixed'
					/>{' '}
					<h2>CNBC Euro News</h2>
				</div>
				{isLoading && theme === 'light' ? (
					<>
						<Image
							src='/images/spinner-light.gif'
							alt='loading'
							width='64'
							height='64'
							unoptimized={true}
						/>
						<p>Proxy server is warming up...</p>
					</>
				) : isLoading && theme === 'dark' ? (
					<>
						<Image
							src='/images/spinner-dark.gif'
							alt='loading'
							width='64'
							height='64'
							unoptimized={true}
						/>
						<p>Proxy server is warming up...</p>
					</>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default CNBCEuroNews;
