import {useState, useEffect} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/legacy/image";
import Banner from '../../Components/Banner'
import badgeHTML from "../../public/images/code/badge-HTML.png";
import badgeCSS from "../../public/images/code/badge-CSS.png";
import badgeJS from "../../public/images/code/badge-JS.png";
import badgeREACT from "../../public/images/code/badge-REACT.png";
import reactClockCode from "../../public/images/code/react-clock-code.jpg";
import rollupCounter from "../../public/images/code/rollup-counter.jpg";
import pizzaPie from "../../public/images/code/pizza-pie.jpg";
import checkboxStyling from "../../public/images/code/checkbox-styling.jpg";
import pagination from "../../public/images/code/pagination.jpg";
import passwordGenerator from "../../public/images/code/password-generator.jpeg";
import weatherApp from "../../public/images/code/weather-app.jpeg";
import CurrencyConverter from "../../public/images/code/currency-converter.jpg";

export default function Code() {
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

	return <>
        <Head>
            <title>Peter Jones | Projects</title>
        </Head>
        <Banner src="/images/banners/Keyboard.jpg"/>
        <div className='content' style={{ minHeight: '2000px' }}>
            <div className={`fade-in ${didMount && "visible"}`}>
                <h1 className='projects page'>Projects</h1>
                <ul className='items-container'>
                    <li className='item'>
                        <Link href='/projects/currency-converter' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeHTML} alt="HTML" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeCSS} alt="CSS" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>Currency Converter</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>A handy currnecy converter</span>
                                </div>
                                <div className="card-image">
                                    <Image src={CurrencyConverter} alt="Currency Converter" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/weather-app' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeHTML} alt="HTML" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeCSS} alt="CSS" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>Weather App</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>A Weather App with a 5 day forecast.</span>
                                </div>
                                <div className="card-image">
                                    <Image src={weatherApp} alt="Weather App" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/random-password-generator' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeREACT} alt="React"  className='tech-badge' width={48} height={16}/>
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>Random Password Generator</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>A random password generator in JavaScript.</span>
                                    <span>
                                        You set the length of the password that you want to
                                        generate and then select the characters you want in the
                                        password.
                                    </span>
                                </div>
                                <div className="card-image">
                                    <Image
                                        src={passwordGenerator}
                                        alt="Random Password Generator"
                                    />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/pagination' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeREACT} alt="React" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>Pagination</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>
                                        A fun project fetching data from an API, adding Google
                                        Maps and paginating the results.
                                    </span>
                                    <span>Lots going on in this one!</span>
                                </div>
                                <div className="card-image">
                                    <Image src={pagination} alt="Pagination" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/checkbox-styling' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeHTML} alt="HTML" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeCSS} alt="CSS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>CSS - Checkbox Styling</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>
                                        Checkboxes can be used for a number of purposes but who
                                        wants to look at the way the browser renders them?
                                    </span>
                                    <span>
                                        Here I explore one way that traditional checkboxes can be
                                        styles to look the same in all browsers.
                                    </span>
                                    <span>Click on this tile to see more...</span>
                                </div>
                                <div className="card-image">
                                    <Image src={checkboxStyling} alt="Checkbox Styling" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/pizza-pie' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeHTML} alt="HTML" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeCSS} alt="CSS" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>Pizza Pie</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>
                                        This was a prototype for an idea for a client who wanted
                                        to graphically show how many orders or vists were left
                                        until a free pizza was available.
                                    </span>
                                    <span>Click on this tile to see more...</span>
                                </div>
                                <div className="card-image">
                                    <Image src={pizzaPie} alt="Pizza Pie" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/rollup-counter' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeCSS} alt="CSS" className='tech-badge' width={48} height={16} />
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title truncate">
                                    <span>Javascript Rollup Counter</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>
                                        This is a vanilla Javascript version of a{" "}
                                        <code className="inline">react-transition-group</code>{" "}
                                        animation that I saw on one of Wes Bos' tutorials.
                                    </span>
                                    <span>
                                        As the counter increments, the numbers roll up to reveal
                                        the increment.
                                    </span>
                                </div>
                                <div className="card-image">
                                    <Image src={rollupCounter} alt="Rollup Counter" />
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='item'>
                        <Link href='/projects/js-clock' passHref legacyBehavior>
                            <div className="card">
                                <div className="card-badges">
                                    <Image src={badgeJS} alt="JS" className='tech-badge' width={48} height={16} />
                                </div>
                                <div className="card-title">
                                    <span>React Twelve Hour Clock</span>
                                </div>
                                <div className="card-intro truncate">
                                    <span>
                                        Here is a simple clock that generates the current time
                                        using a new JavaScript{" "}
                                        <code className="inline">Date</code> object.
                                    </span>
                                    <span>Click on this tile to see more...</span>
                                </div>
                                <div className="card-image">
                                    <Image src={reactClockCode} alt="Template" />
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </>;
};
