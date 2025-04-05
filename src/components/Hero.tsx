import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiArrowDown } from 'react-icons/fi';

const heroImages = [
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf',
  'https://images.unsplash.com/photo-1496180470114-6ef490f3ff22',
  'https://images.unsplash.com/photo-1491336477066-31156b5e4f35'
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.8 }
    })
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image}
              alt="Muestra de fotografía"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center brightness-50"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            custom={0}
            variants={fadeInUpVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold mb-6 text-white"
          >
            Capturando momentos que duran toda la vida
          </motion.h1>
          
          <motion.p
            custom={1}
            variants={fadeInUpVariants}
            className="text-lg md:text-xl font-light text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Servicios profesionales de fotografía adaptados a tu visión y estilo único
          </motion.p>
          
          <motion.div
            custom={2}
            variants={fadeInUpVariants}
          >
            <a 
              href="#portfolio" 
              className="inline-block bg-transparent border-2 border-gold-500 text-gold-500 px-8 py-3 text-lg font-medium transition-all duration-300 hover:bg-gold-500 hover:text-black"
            >
              Ver Portafolio
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FiArrowDown className="text-white text-3xl" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
