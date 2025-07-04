import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { services } from '@/lib/constants';
import { ServiceType } from '@/lib/types';

const ServiceDetail = () => {
  const [, params] = useRoute('/services/:id');
  const [service, setService] = useState<ServiceType | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params && params.id) {
      const foundService = services.find(s => s.id === params.id);
      if (foundService) {
        setService(foundService);
        document.title = `${foundService.title} - Omav Construction`;
      }
    }
  }, [params]);

  if (!service) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-primary mb-4">Service Not Found</h2>
        <p className="text-secondary mb-8">The service you're looking for may have been moved or doesn't exist.</p>
        <Link href="/services">
          <a className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-light transition duration-200">
            View All Services
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img 
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
            <p className="text-lg md:text-xl opacity-90">{service.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-gray-light py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center text-sm">
            <Link href="/">
              <a className="text-secondary hover:text-primary">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/services">
              <a className="text-secondary hover:text-primary">Services</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Service Description */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Overview</h2>
              <p className="text-secondary mb-8 text-lg">
                {service.fullDescription}
              </p>
              
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Key Features</h3>
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Benefits</h3>
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <i className="fas fa-star text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Why Choose Omav for {service.title}</h3>
                <p className="text-secondary mb-4">
                  With Omav Construction, you're not just getting a service provider; you're gaining a partner committed to bringing your vision to life with quality, efficiency, and attention to detail.
                </p>
                <p className="text-secondary">
                  Our experienced team understands the unique requirements of different projects and tailors our approach to meet your specific needs, ensuring a successful outcome that exceeds your expectations.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Service Sidebar */}
              <div className="bg-gray-light p-6 rounded-lg mb-8">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Get a Quote</h3>
                <p className="text-secondary mb-4">
                  Interested in our {service.title.toLowerCase()}? Contact us for a free consultation and quote.
                </p>
                <Link href="/contact">
                  <a className="block bg-accent text-white text-center py-3 rounded-md hover:bg-amber-600 transition duration-200">
                    Request a Quote
                  </a>
                </Link>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray mb-8">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Other Services</h3>
                <ul className="space-y-3">
                  {services
                    .filter(s => s.id !== service.id)
                    .map(s => (
                      <li key={s.id} className="border-b border-gray-200 pb-2 last:border-0">
                        <Link href={`/services/${s.id}`}>
                          <a className="text-secondary hover:text-primary flex items-center">
                            <i className={`${s.icon} mr-2 text-accent`}></i>
                            {s.title}
                          </a>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
              
              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="font-heading text-xl font-bold mb-4">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-phone-alt mt-1 mr-3 text-accent"></i>
                    <div className="flex flex-col">
                      <span>+91 7870384888</span>
                      <span>+91 7870374888</span>
                      <span>+91 7870314888</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-envelope mt-1 mr-3 text-accent"></i>
                    <span>info@omavopconstructions.com</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt mt-1 mr-3 text-accent"></i>
                    <span>Above Pratibha Dental Clinic, Near Dream Jewel Apartment, R. K. Puram, Danapur, Patna, Bihar. PIN Code: 801503</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">
              Related Projects
            </h2>
            <p className="text-secondary max-w-3xl mx-auto">
              Take a look at some of our successful projects related to {service.title.toLowerCase()}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={`https://images.unsplash.com/photo-15${60 + index}0585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80`} 
                  alt={`Project ${index}`} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">
                    {service.title} Project {index}
                  </h3>
                  <p className="text-secondary mb-4">
                    A showcase of our expertise in {service.title.toLowerCase()}, delivering quality results for our clients.
                  </p>
                  <Link href="/projects">
                    <a className="text-accent hover:text-amber-600 font-medium">
                      View Project Details
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/projects">
              <a className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200">
                View All Projects
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your {service.title.toLowerCase()} needs and how we can help bring your vision to life.
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

export default ServiceDetail;
