import { Link } from 'wouter';
import { motion } from 'framer-motion';

const CTABanner = () => {
  return (
    <section className="bg-accent py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className="mb-6 lg:mb-0 text-center lg:text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-white font-heading text-2xl md:text-3xl font-bold">Ready to Build Your Vision?</h3>
            <p className="text-white opacity-90 mt-2">Let's discuss your project requirements and bring your ideas to life.</p>
          </motion.div>
          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/contact" className="bg-white hover:bg-gray-light text-primary font-medium py-3 px-8 rounded-md transition duration-200 flex items-center justify-center">
              Get a Free Quote
            </Link>
            <a href="tel:+917870384888" className="bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200 flex items-center justify-center">
              <i className="fas fa-phone-alt mr-2"></i> Call Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
