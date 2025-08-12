import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from "next/legacy/image";
import styles from '../../styles/News.module.scss';

const FEED_URL = 'https://www.cbc.ca/webfeed/rss/rss-technology';
const CORS_PROXY = 'https://my-dev-proxy-server.herokuapp.com/';
const URL_TO_FETCH = CORS_PROXY + FEED_URL;

const CBCTechnologyNews = () => {
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
					const title = item.querySelector('title').textContent;
					const link = item.querySelector('link').textContent;
					const description = item.querySelector('description').textContent;
					const pubDate = item.querySelector('pubDate').textContent;
					const category = item.querySelector('category').textContent;
					const guid = item.querySelector('guid').textContent;

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
			});
	}, []);

	return (
		<>
			<Head>
				<title>Peter Jones | CBC Technology News</title>
			</Head>
			<div className='feeds-container content'>
				<div className={styles.newsfeedHeader}>
					<Image
						src='/images/news/cbc.jpg'
						alt='cbc news'
						width='100'
						height='100'
					/>{' '}
					<h2>CBC - Technology News</h2>
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

export default CBCTechnologyNews;
