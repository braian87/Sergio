import { NextPage } from 'next';
import Head from 'next/head';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Blog from '../components/Blog';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import PrivateGallery from '../components/PrivateGallery';
import Chatbot from '../components/Chatbot';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sergio López Photography | Professional Photography Services</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Sergio López Photography",
              "image": "https://sergiolopez-photography.com/images/og-image.jpg",
              "url": "https://sergiolopez-photography.com",
              "telephone": "+1-234-567-8900",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Photography St",
                "addressLocality": "San Francisco",
                "addressRegion": "CA",
                "postalCode": "94103",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "37.7749",
                "longitude": "-122.4194"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.instagram.com/sergiolopezphotography",
                "https://www.facebook.com/sergiolopezphotography"
              ]
            })
          }}
        />
      </Head>
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Pricing />
        <Blog />
        <FAQ />
        <Contact />
        <PrivateGallery />
      </main>
      <Chatbot />
    </>
  );
};

export default Home;
