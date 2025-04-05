import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { portfolio, categories } from '../data/portfolio';
import Lightbox from './ui/Lightbox';

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string;
    alt: string;
    category: string;
  }>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  const filteredImages = activeCategory === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === activeCategory);

  return (
    <section 
      id="portfolio" 
      ref={ref} 
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Portafolio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Una selección de mi mejor trabajo en diferentes géneros fotográficos
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeCategory === 'all' 
                ? 'bg-gold-500 text-black' 
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            Todos
          </button>
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeCategory === category.value 
                  ? 'bg-gold-500 text-black' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="sync">
            {filteredImages.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => setSelectedImage({
                  src: item.src,
                  alt: item.alt,
                  category: item.category
                })}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-xl">{item.title}</h3>
                  <p className="text-gold-500">{categories.find(cat => cat.value === item.category)?.label}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
};

export default Portfolio;
