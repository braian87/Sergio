import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';
import { Button } from './ui/Button';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [submitted, setSubmitted] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  
  // Verificar si se ha seleccionado un paquete al cargar el componente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPackage = sessionStorage.getItem('selectedPackage');
      if (storedPackage) {
        setSelectedPackage(storedPackage);
      }
    }
  }, []);

  const contactSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Email inválido').required('El email es requerido'),
    subject: Yup.string().required('El asunto es requerido'),
    message: Yup.string().required('El mensaje es requerido').min(10, 'El mensaje es muy corto'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      subject: selectedPackage ? `Consulta sobre paquete: ${selectedPackage}` : '',
      message: selectedPackage ? `Estoy interesado/a en el paquete ${selectedPackage}. Me gustaría obtener más información.` : '',
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      // Crear mensaje para WhatsApp
      const packageInfo = selectedPackage ? `*Paquete seleccionado:* ${selectedPackage}%0A` : '';
      const whatsappMessage = `*Nombre:* ${values.name}%0A*Email:* ${values.email}%0A${packageInfo}*Asunto:* ${values.subject}%0A*Mensaje:* ${values.message}`;
      
      // Abrir WhatsApp con el mensaje pre-completado
      window.open(`https://wa.me/5491134455667?text=${whatsappMessage}`, '_blank');
      
      // Marcar como enviado
      setSubmitted(true);
      
      // Limpiar del sessionStorage el paquete seleccionado
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('selectedPackage');
      }
      
      // Resetear el formulario después de 2 segundos
      setTimeout(() => {
        setSubmitted(false);
        formik.resetForm();
        setSelectedPackage(null);
      }, 2000);
    },
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
      id="contact" 
      ref={ref} 
      className="py-24 bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Contáctame</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            ¿Listo para capturar tus momentos especiales? Comunícate conmigo y hablemos sobre tu visión.
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12"
        >
          {/* Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-black border border-gray-800 rounded-lg p-8"
          >
            <h3 className="text-2xl font-serif text-white mb-6">Información de Contacto</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-full p-3 mr-4">
                  <FiMail className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Email</h4>
                  <a href="mailto:contact@sergiolopez.photo" className="text-gray-400 hover:text-gold-500 transition-colors">
                    contact@sergiolopez.photo
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-full p-3 mr-4">
                  <FiPhone className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Teléfono</h4>
                  <a href="tel:+5491134455667" className="text-gray-400 hover:text-gold-500 transition-colors">
                    +54 9 11 3445-5667
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-gray-900 rounded-full p-3 mr-4">
                  <FiMapPin className="text-gold-500" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-medium mb-1">Dirección del Estudio</h4>
                  <p className="text-gray-400">
                    Av. Fotografía 123<br />
                    Buenos Aires, Argentina
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-white font-medium mb-4">Sígueme</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/sergiolopezphotography" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-gray-900 hover:bg-gold-500 text-white hover:text-black rounded-full p-3 transition-colors"
                  aria-label="Instagram"
                >
                  <FiInstagram size={20} />
                </a>
                <a 
                  href="https://facebook.com/sergiolopezphotography" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-gray-900 hover:bg-gold-500 text-white hover:text-black rounded-full p-3 transition-colors"
                  aria-label="Facebook"
                >
                  <FiFacebook size={20} />
                </a>
                <a 
                  href="https://twitter.com/sergiolopezphoto" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-gray-900 hover:bg-gold-500 text-white hover:text-black rounded-full p-3 transition-colors"
                  aria-label="Twitter"
                >
                  <FiTwitter size={20} />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 bg-black border border-gray-800 rounded-lg p-8"
          >
            {submitted ? (
              <div className="text-center py-16">
                <svg
                  className="w-16 h-16 text-gold-500 mx-auto mb-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h3 className="text-2xl font-serif text-white mb-2">¡Gracias!</h3>
                <p className="text-gray-400 mb-6">Tu mensaje se ha enviado a WhatsApp. Me pondré en contacto contigo pronto.</p>
                <Button 
                  variant="default" 
                  onClick={() => {
                    setSubmitted(false);
                    formik.resetForm();
                  }}
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={formik.handleSubmit}>
                {selectedPackage && (
                  <div className="mb-6 p-4 bg-gray-900 border border-gold-500 rounded-lg">
                    <p className="text-gold-500 font-medium mb-1">Paquete seleccionado</p>
                    <p className="text-white">{selectedPackage}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-white mb-2">Nombre</label>
                    <input
                      id="name"
                      type="text"
                      className={`w-full bg-gray-900 border ${
                        formik.touched.name && formik.errors.name 
                          ? 'border-red-500' 
                          : 'border-gray-700'
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors`}
                      placeholder="Tu nombre"
                      {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white mb-2">Email</label>
                    <input
                      id="email"
                      type="email"
                      className={`w-full bg-gray-900 border ${
                        formik.touched.email && formik.errors.email 
                          ? 'border-red-500' 
                          : 'border-gray-700'
                      } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors`}
                      placeholder="Tu dirección de email"
                      {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-white mb-2">Asunto</label>
                  <input
                    id="subject"
                    type="text"
                    className={`w-full bg-gray-900 border ${
                      formik.touched.subject && formik.errors.subject 
                        ? 'border-red-500' 
                        : 'border-gray-700'
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors`}
                    placeholder="Asunto de tu mensaje"
                    {...formik.getFieldProps('subject')}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white mb-2">Mensaje</label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`w-full bg-gray-900 border ${
                      formik.touched.message && formik.errors.message 
                        ? 'border-red-500' 
                        : 'border-gray-700'
                    } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors`}
                    placeholder="Tu mensaje"
                    {...formik.getFieldProps('message')}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  isLoading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                >
                  Enviar Mensaje a WhatsApp
                </Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
