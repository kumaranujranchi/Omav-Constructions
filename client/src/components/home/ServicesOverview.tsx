import { Link } from 'wouter';
import { motion } from 'framer-motion';
import ServiceCard from '../common/ServiceCard';
import { services } from '@/lib/constants';

const ServicesOverview = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Our Comprehensive Services
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            From constructing robust buildings to designing beautiful interiors, 
            our team ensures excellence at every step of your construction journey.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <motion.a
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Services
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
