import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { services } from '../data/services';

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="services" 
      ref={ref} 
      className="py-24 bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Servicios</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Servicios especializados de fotografía diseñados para capturar tu visión con precisión y arte
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="bg-black border border-gray-800 p-8 rounded-lg transition-transform duration-300 hover:transform hover:scale-105 hover:border-gold-500"
            >
              <div className="text-gold-500 mb-4">
                {service.iconComponent()}
              </div>
              <h3 className="text-xl font-serif text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6">{service.description}</p>
              <div className="text-sm text-gray-300 space-y-2">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gold-500 mr-2">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
