import { useState, useEffect } from 'react';
import Head from 'next/head'
// import styles from '../styles/Home.module.css'

export default function Home() {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if ( window.location.search.includes('success=true') ) {
      setSuccess(true);
      props.history.push("/contact/success");
    }
  }, []);

  return (
    <>
      <div className='container'>
  
        <main className='main'>
          <h1 className='title'>Contact Form</h1>
  
          {success && (
            <p style={{ color: 'green'}}>
              Successfully submitted form!
            </p>
          )}
  
          <div className='grid'>
            <div className='form-container'>
              <form name="contact" method="POST" action="/contact/success" netlify-honeypot="bot-field" data-netlify="true">
                <input type="hidden" name="form-name" value="contact" />
                <p>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" />
                </p>
                <p>
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" className='contact-email' />
                </p>
                <p>
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message"></textarea>
                </p>
                <p>
                  <button type="submit" className='btn-submit'>Send</button>
                </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}