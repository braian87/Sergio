import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
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
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-black py-16 border-t border-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div variants={itemVariants} className="md:col-span-2">
            <div className="mb-6 w-40">
              <Image 
                src="/images/logo.svg" 
                alt="Sergio López Photography" 
                width={160} 
                height={60} 
              />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Crafting timeless memories through the lens, with a focus on quality, 
              authenticity and artistic expression. Available for bookings worldwide.
            </p>
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
              <a 
                href="https://youtube.com/sergiolopezphotography" 
                target="_blank" 
                rel="noreferrer"
                className="bg-gray-900 hover:bg-gold-500 text-white hover:text-black rounded-full p-3 transition-colors"
                aria-label="YouTube"
              >
                <FiYoutube size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/sergiolopezphotography" 
                target="_blank" 
                rel="noreferrer"
                className="bg-gray-900 hover:bg-gold-500 text-white hover:text-black rounded-full p-3 transition-colors"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#about" className="text-gray-400 hover:text-gold-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Visual Diary
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-serif text-white mb-6">Contact Info</h3>
            <ul className="space-y-3">
              <li className="text-gray-400">
                <strong className="text-gold-500">Address:</strong><br />
                123 Photography St<br />
                San Francisco, CA 94103
              </li>
              <li>
                <a href="mailto:contact@sergiolopez.photo" className="text-gray-400 hover:text-gold-500 transition-colors">
                  <strong className="text-gold-500">Email:</strong><br />
                  contact@sergiolopez.photo
                </a>
              </li>
              <li>
                <a href="tel:+12345678900" className="text-gray-400 hover:text-gold-500 transition-colors">
                  <strong className="text-gold-500">Phone:</strong><br />
                  +1 (234) 567-8900
                </a>
              </li>
              <li className="text-gray-400">
                <strong className="text-gold-500">Working Hours:</strong><br />
                Mon-Fri: 9AM - 6PM
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sergio López Photography. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-4 text-sm text-gray-500">
              <li>
                <a href="#" className="hover:text-gold-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-500 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="hover:text-gold-500 transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
