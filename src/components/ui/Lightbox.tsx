import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiX } from 'react-icons/fi';

interface LightboxProps {
  image: {
    src: string;
    alt: string;
    category: string;
  };
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps) => {
  // Close lightbox when pressing escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    // Prevent scrolling on body when lightbox is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 bg-black bg-opacity-50 rounded-full p-2 text-white hover:text-gold-500 transition-colors"
        aria-label="Close lightbox"
      >
        <FiX size={24} />
      </button>
      
      {/* Image container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            className="object-contain"
            priority
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
