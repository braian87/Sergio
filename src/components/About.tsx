import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-24 bg-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          className="max-w-screen-xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Sobre Mí</h2>
            <div className="w-20 h-1 bg-gold-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1621063573999-5af1e96634f8"
                alt="Sergio López - Fotógrafo Profesional"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-serif text-white">Sergio López</h3>
              <p className="text-gold-500 font-light text-lg mb-6">Fotógrafo Profesional</p>
              
              <p className="text-gray-300 leading-relaxed">
                Con más de 10 años de experiencia en fotografía profesional, me especializo en capturar la esencia de las personas, 
                momentos y productos. Mi enfoque combina precisión técnica con visión artística para crear 
                imágenes que cuentan historias convincentes.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Creo que cada fotografía debe evocar emoción y preservar recuerdos que duran toda la vida. 
                Ya sea una boda, una sesión de retratos o fotografía de productos, aporto el mismo nivel de 
                dedicación y atención al detalle a cada proyecto.
              </p>
              
              <p className="text-gray-300 leading-relaxed">
                Establecido en Madrid, trabajo con clientes en toda España y estoy disponible 
                para sesiones en cualquier destino del mundo. Mi trabajo ha sido presentado en varias publicaciones, 
                y he tenido el privilegio de trabajar con clientes extraordinarios que confían en mí para documentar 
                sus momentos más importantes.
              </p>

              <div className="flex space-x-4 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-serif text-gold-500">10+</span>
                  <span className="text-sm text-gray-400 mt-1">Años de Experiencia</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-serif text-gold-500">500+</span>
                  <span className="text-sm text-gray-400 mt-1">Sesiones Fotográficas</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-serif text-gold-500">200+</span>
                  <span className="text-sm text-gray-400 mt-1">Clientes Satisfechos</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
