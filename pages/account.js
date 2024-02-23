import {useState, useEffect} from 'react'
import Head from 'next/head';
import { getSession, signOut } from 'next-auth/react'

export default function Account({ session }) {
  const user = session?.user

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
  <div className="content">
  <div className={`fade-in ${didMount && "visible"}`}>
    <div><p>You can only see this page if you are logged in!</p></div><br />
    <button onClick={() => signOut()} className='button'>Sign out</button>
    </div>
    </div>
  </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if(!session) return { redirect: { destination: '/', permanent: false } }

  return {
    props: {session}
  }
}