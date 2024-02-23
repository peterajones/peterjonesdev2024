import Head from 'next/head';
import Link from 'next/link';
import {createClient} from 'next-sanity';

export default function IndexPage({ animals }) {
  return <>
  <Head>
              <title>Peter Jones | Sanity Test</title>
          </Head>
    <div className='content'>
              <Link href='/projects' className='backBtn'>
                  Back to Projects
              </Link>
              <div className='btnSpacer'></div>
      <h1>Sanity + Next.js</h1>
    <main>
      <h2>Animals</h2>
      {animals.length > 0 && (
        <ul>
          {animals.map((animal) => (
            <li key={animal._id}>{animal?.name}</li>
          ))}
        </ul>
      )}
      {!animals.length > 0 && <p>No animals to show</p>}
      {animals.length > 0 && (
        <div>
          <pre>{JSON.stringify(animals, null, 2)}</pre>
        </div>
      )}
      {!animals.length > 0 && (
        <div>
          <div>¯\_(ツ)_/¯</div>
          <p>
            Your data will show up here when you've configured everything
            correctly
          </p>
        </div>
      )}
    </main>
    </div>
  </>;
}

const client = createClient({
  projectId: "fq72nog3",
  dataset: "production",
  apiVersion: "2022-11-20",
  useCdn: false
});

export async function getStaticProps() {
  const animals = await client.fetch(`*[_type == "animal"] | order(_createdAt desc)`);

  return {
    props: {
      animals
    }
  };
}