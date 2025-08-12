import Script from 'next/script';

const GoogleMap = () => {
  const apikey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log(apikey);
  console.log('hello from google maps component');
    
  return (
    <></>
    // <Script
    //   src={`https://maps.googleapis.com/maps/api/js?key=${apikey}&loading=async&libraries=places`}
    //   defer
    // />
  );
};
console.log('google map script has loaded');

export default GoogleMap;