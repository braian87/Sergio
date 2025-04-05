import { Variants } from 'framer-motion';

// Fade up animation
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
    }
  })
};

// Stagger container animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    }
  }
};

// Fade in animation
export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
    }
  })
};

// Scale animation
export const scaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
    }
  })
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
    }
  })
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.5,
    }
  })
};

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  enter: { 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' }
  }
};
