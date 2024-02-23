import Router from 'next/router'
import NProgress from 'nprogress'
import { SessionProvider } from 'next-auth/react'
import Layout from "../Components/Layout"
import '../styles/globals.scss'

NProgress.configure({
	easing: 'ease-in-out',
	speed: 350,
	showSpinner: false,
	trickleRate: 1.02,
	trickleSpeed: 800
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
