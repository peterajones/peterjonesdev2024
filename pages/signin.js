import {useState, useEffect} from 'react'
import { getProviders, signIn, getSession, getCsrfToken} from "next-auth/react";

export default function SignIn({ providers, csrfToken }) {
  const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		setDidMount(true);
	}, []);

  return (
    <div className="content">
      <div className={`fade-in ${didMount && "visible"}`}>
        <div className="sign-in-container">
          {/* <div className="email-form-container">
            <form method="post" action="/api/auth/signin/email" className="email-form">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                <p className="email-label">Email address</p>
                <input type="text" id="email" name="email" placeholder="Email address" />
              </label>
              <button type="submit" className="button">Sign In with Email</button>
            </form>
          </div> */}
          {/* <div className="divider"></div> */}
          <div className="signin-providers-section">
            {csrfToken && Object.values(providers).map((provider) => {
              if (provider.name === "Email") {
                return;
              }
              return (
                <>
                  <div className="signin-providers" key={provider.name}>
                    <button key={provider.name} onClick={() => signIn(provider.id)} className="button">Sign in with {provider.name}</button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const session = await getSession({ req });
  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const providers = await getProviders(context);
  console.log(`Providers: ${providers}`);
  const csrfToken = await getCsrfToken(context);
  console.log(`Token: ${csrfToken}`);
  return {
    props: { providers, csrfToken },
  }
}