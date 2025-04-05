import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { testimonials } from '../data/testimonials';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6 }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="testimonials" 
      ref={ref} 
      className="py-24 bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Client Testimonials</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear what my clients have to say about their experiences
            </p>
            <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative bg-black border border-gray-800 rounded-lg p-8 md:p-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-black border-2 border-gold-500 flex items-center justify-center">
                  <span className="text-gold-500 text-2xl font-serif">"</span>
                </div>
              </div>

              <div className="h-[250px] md:h-[200px] flex items-center justify-center">
                <motion.div
                  key={currentIndex}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={slideVariants}
                  className="text-center"
                >
                  <p className="text-lg text-gray-300 italic mb-6">
                    {testimonials[currentIndex].quote}
                  </p>
                  <h4 className="text-white font-medium">{testimonials[currentIndex].name}</h4>
                  <p className="text-gold-500 text-sm">{testimonials[currentIndex].role}</p>
                </motion.div>
              </div>

              <div className="flex justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAutoplay(false);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 mx-1 rounded-full ${
                      index === currentIndex ? 'bg-gold-500' : 'bg-gray-700'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full bg-gray-900 text-white hover:bg-gold-500 hover:text-black transition-colors"
                  aria-label="Previous testimonial"
                >
                  <FiChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-gray-900 text-white hover:bg-gold-500 hover:text-black transition-colors"
                  aria-label="Next testimonial"
                >
                  <FiChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
