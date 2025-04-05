import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { blog } from '../data/blog';

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
      id="blog" 
      ref={ref} 
      className="py-24 bg-gray-950"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Visual Diary</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Photography insights, stories behind the shoots, and creative inspiration
          </p>
          <div className="w-20 h-1 bg-gold-500 mx-auto mt-6"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blog.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-black border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:transform hover:scale-105 hover:border-gold-500"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-gold-500 text-sm">{post.category}</span>
                  <span className="text-gray-400 text-sm mx-2">•</span>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                
                <h3 className="text-xl font-serif text-white mb-3">{post.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                
                <Link href={`#blog-${post.id}`} className="text-gold-500 inline-flex items-center group">
                  Read More 
                  <svg 
                    className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
