import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Button } from './ui/Button';
import { pricing } from '../data/pricing';

const Pricing = () => {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChoosePackage = (packageName: string) => {
    // Navegar al formulario de contacto y pasar información del paquete seleccionado
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    
    // Puedes también guardar la selección en sessionStorage para referencia
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedPackage', packageName);
    }
  };

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
      id="pricing" 
      ref={ref} 
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Paquetes y Precios</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paquetes de fotografía adaptados a cada necesidad y presupuesto
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricing.map((plan) => (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              className={`relative bg-gray-950 border rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-105 ${
                plan.popular ? 'border-gold-500' : 'border-gray-800'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gold-500 text-black px-4 py-1 text-sm font-medium">
                  Popular
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-serif text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-serif text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.unit}</span>
                </div>
                
                <div className="text-sm text-gray-300 space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-gold-500 mr-2">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleChoosePackage(plan.name)}
                  variant={plan.popular ? "default": }
                  className="w-full"
                >
                  Elegir Paquete
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center text-gray-400">
          <p>¿Necesitas un paquete personalizado? <a href="#contact" className="text-gold-500 hover:underline">Contáctame</a> para un presupuesto a medida.</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
