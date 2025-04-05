import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

interface AccordionProps {
  title: string;
  content: string;
  initiallyOpen?: boolean;
}

const Accordion = ({ title, content, initiallyOpen = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left bg-gray-950 text-white flex justify-between items-center focus:outline-none hover:bg-gray-900 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiChevronDown className="text-gold-500" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 bg-black text-gray-300">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
