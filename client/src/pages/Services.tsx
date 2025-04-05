import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { services } from '@/lib/constants';
import ServiceCard from '@/components/common/ServiceCard';

const Services = () => {
  useEffect(() => {
    document.title = 'Services - Omav Constructions';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80" 
            alt="Construction Services" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl opacity-90">
              Comprehensive construction solutions for all your building needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Comprehensive Services</h2>
            <p className="text-lg text-secondary">
              From constructing robust buildings to designing beautiful interiors, our team ensures excellence at every step of your construction journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Why Choose Our Services</h2>
            <p className="text-lg text-secondary">
              What sets Omav Constructions services apart from the competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-certificate"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Quality & Durability</h3>
              <p className="text-secondary">
                We use only premium materials and proven construction techniques to ensure longevity and structural integrity in all our projects.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-users"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Expert Team</h3>
              <p className="text-secondary">
                Our team comprises experienced architects, engineers, and craftsmen who bring expertise and passion to every project.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">End-to-End Solutions</h3>
              <p className="text-secondary">
                From conceptualization to completion, we handle all aspects of the project, providing a seamless experience for our clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Approach to Service Delivery</h2>
              <p className="text-secondary mb-4">
                At Omav Constructions, we follow a structured approach to ensure consistent quality and satisfaction in every service we provide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span className="text-secondary">Client-centric planning that puts your needs first</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span className="text-secondary">Transparent communication throughout the project lifecycle</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span className="text-secondary">Rigorous quality control at every stage</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span className="text-secondary">Adherence to timelines and budget constraints</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                  <span className="text-secondary">Post-completion support and maintenance guidance</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                alt="Our service approach" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to discuss your project?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to learn more about our services and how we can help bring your construction vision to reality.
            </p>
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
                Get a Free Consultation
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
