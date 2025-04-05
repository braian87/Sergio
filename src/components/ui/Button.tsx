import { ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  href?: string;
  className?: string;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  href,
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-gold-500 hover:bg-gold-600 text-black',
    secondary: 'bg-transparent border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black',
    outline: 'bg-transparent border border-gray-600 text-white hover:border-gold-500 hover:text-gold-500',
  };
  
  const sizeStyles = {
    sm: 'text-sm px-3 py-1.5 rounded-md',
    md: 'px-6 py-3 rounded-lg',
    lg: 'text-lg px-8 py-4 rounded-lg',
  };
  
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  const content = (
    <>
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        whileTap={{ scale: 0.97 }}
      >
        {content}
      </motion.a>
    );
  }
  
  return (
    <motion.button
      className={buttonClasses}
      whileTap={{ scale: 0.97 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </motion.button>
  );
};

export default Button;
          
