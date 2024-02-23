import { useState, useEffect } from "react";
import Head from "next/head";
import Banner from "../../Components/Banner";

export default function ThankYou() {
	const [didMount, setDidMount] = useState(false);
	const [scroll, setScroll] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
		setDidMount(true);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	function handleScroll() {
		let scroll = window.scrollY;
		setScroll(scroll);
	}

	return (
		<>
		<Head>
			<title>Peter Jones | Thank You!</title>
		</Head>
		<Banner src="/images/banners/People.jpg" />
		<div className='content' style={{ minHeight: '2000px' }}>
			<div className={`fade-in ${didMount && "visible"}`}>
				<div className="container">
					<div className="content">
						<h1>Thank you for contacting me.</h1>
						<p>I will get back to you as soon as I can!</p>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};
