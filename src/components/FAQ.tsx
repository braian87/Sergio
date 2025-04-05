import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Accordion from './ui/Accordion';
import { faq } from '../data/faq';

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="faq" 
      ref={ref} 
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about my photography services
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {faq.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="mb-4"
            >
              <Accordion
                title={item.question}
                content={item.answer}
                initiallyOpen={index === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Still have questions? <a href="#contact" className="text-gold-500 hover:underline">Contact me</a> and I'll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
