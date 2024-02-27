import Head from 'next/head';

const GoogleMap = () => (
  <Head>
    <script
      src={`https://maps.googleapis.com/maps/api/js?key=process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY&libraries=places`}
      async
      defer
    ></script>
  </Head>
);

export default GoogleMap;