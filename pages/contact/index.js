import { useState, useEffect } from "react";
import Head from "next/head";
import ContactForm from "./ContactForm";
import Banner from "../../Components/Banner";

const Contact = props => {
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
			<title>Peter Jones | Contact Me</title>
		</Head>
		<Banner src="/images/banners/People.jpg" />
		<div className='content' style={{ minHeight: '2000px' }}>
			<div className={`fade-in ${didMount && "visible"}`}>
				<div className="container">
					<div className="content">
						{/* <h1>Contact Me</h1>
						<p>Please fill out the form below. I will get back to you ASAP!</p> */}
						<ContactForm history={props.history} />
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default Contact;
