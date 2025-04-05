import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiLock, FiUnlock, FiX } from 'react-icons/fi';
import Button from './ui/Button';

// Placeholder images for private gallery (these would be replaced with actual client photos)
const privateGalleryImages = [
  'https://images.unsplash.com/photo-1606070348308-8f4ed2f9a06d',
  'https://images.unsplash.com/photo-1604017011826-d3b4c23f8914',
  'https://images.unsplash.com/photo-1533091090875-1ff4acc497dd',
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f',
  'https://images.unsplash.com/photo-1612817159576-986a0b7a4165',
  'https://images.unsplash.com/photo-1611240315822-2d2e692dffd7'
];

const PrivateGallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUnlock = () => {
    // In a real implementation, this would validate against a backend
    // Since this is a static site demo, we'll just use a fixed code
    if (accessCode === '1234') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Invalid access code. Please try again or contact me for assistance.');
    }
  };

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

  return (
    <section 
      id="private-gallery" 
      ref={ref} 
      className="py-24 bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Client Private Gallery</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Access your private photo collection with your unique code
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-2xl mx-auto"
        >
          {!isUnlocked ? (
            <motion.div
              variants={itemVariants}
              className="bg-black border border-gray-800 rounded-lg p-8 text-center"
            >
              <div className="bg-gray-900 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <FiLock className="text-gold-500" size={24} />
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-3">Enter Your Access Code</h3>
              <p className="text-gray-400 mb-6">
                This area is reserved for clients to access their private photo collections.
                If you have an access code, please enter it below.
              </p>
              
              <div className="mb-6">
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Enter your access code"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              
              <Button 
                variant="primary" 
                onClick={handleUnlock}
              >
                Unlock Gallery
              </Button>
              
              <p className="text-gray-500 text-sm mt-6">
                Don't have a code? Contact me to request access to your photos.
              </p>
            </motion.div>
          ) : (
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <FiUnlock className="text-gold-500 mr-2" size={20} />
                  <h3 className="text-xl font-serif text-white">Your Private Collection</h3>
                </div>
                <Button 
                  variant="secondary" 
                  onClick={() => setIsUnlocked(false)}
                  size="sm"
                >
                  Lock Gallery
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {privateGalleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:transform hover:scale-105"
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={image}
                      alt={`Private gallery image ${index + 1}`}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox for private gallery */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black rounded-full p-2 text-white hover:text-gold-500 focus:outline-none"
              aria-label="Close lightbox"
            >
              <FiX size={24} />
            </button>
            
            <div className="relative max-w-4xl max-h-[80vh] w-full">
              <Image
                src={selectedImage}
                alt="Private gallery image"
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PrivateGallery;
