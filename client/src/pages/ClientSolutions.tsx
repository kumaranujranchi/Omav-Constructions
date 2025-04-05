import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { clientSolutions } from '@/lib/constants';
import { ClientSolutionType } from '@/lib/types';

const ClientSolutions = () => {
  useEffect(() => {
    document.title = 'Client Solutions - Omav Construction';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1526642738196-ad8897ad7bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Client Solutions" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Tailored Solutions for Every Client</h1>
            <p className="text-lg md:text-xl opacity-90">
              Specialized construction services designed to meet your unique needs
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Client-Focused Approach</h2>
            <p className="text-lg text-secondary">
              At Omav Construction, we understand that different clients have different needs. We offer specialized solutions for homeowners, real estate developers, and commercial clients, ensuring that each project receives the attention and expertise it deserves.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {clientSolutions.map((solution, index) => (
              <SolutionCard key={solution.id} solution={solution} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Solutions */}
      {clientSolutions.map((solution, index) => (
        <DetailedSolution key={solution.id} solution={solution} isEven={index % 2 === 0} />
      ))}

      {/* Testimonials */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Client Success Stories</h2>
            <p className="text-lg text-secondary">
              Hear from our satisfied clients across different segments
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
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="text-secondary italic mb-6">
                "As first-time homebuilders, we were nervous about the process. Omav guided us every step of the way, providing transparent communication, quality craftsmanship, and a beautiful end result that exceeded our expectations."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary">Rajesh & Sunita Sharma</div>
                  <div className="text-secondary text-sm">Homeowners, Patna</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="text-secondary italic mb-6">
                "We partnered with Omav for our 50-unit apartment complex. Their scalable capabilities, regulatory expertise, and cost-effective approach helped us deliver the project on time and within budget, maximizing our ROI."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary">Amit Agarwal</div>
                  <div className="text-secondary text-sm">Real Estate Developer, Delhi-NCR</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="text-secondary italic mb-6">
                "Our restaurant needed a major renovation with minimal disruption to our business. Omav's team worked efficiently during off-hours and phased the construction to allow us to remain partially operational throughout the process."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary">Priya Malhotra</div>
                  <div className="text-secondary text-sm">Restaurant Owner, Kolkata</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Why Choose Omav for Your Project</h2>
            <p className="text-lg text-secondary">
              What sets our client solutions apart from the competition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-user-tie"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Client-Centric Approach</h3>
              <p className="text-secondary">
                We prioritize your specific needs and preferences, tailoring our solutions to match your vision and requirements rather than offering one-size-fits-all services.
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
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Industry Expertise</h3>
              <p className="text-secondary">
                With 12+ years of experience across diverse projects, our team brings specialized knowledge and insights that help anticipate and address challenges specific to your project type.
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
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Transparent Communication</h3>
              <p className="text-secondary">
                We maintain open and honest communication throughout your project, ensuring you're informed and involved in every important decision and milestone.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Quality Assurance</h3>
              <p className="text-secondary">
                Our rigorous quality control processes ensure that every project, regardless of size or scope, meets our exacting standards for craftsmanship, durability, and aesthetics.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to discuss your specific needs?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today for a personalized consultation tailored to your project requirements.
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

interface SolutionCardProps {
  solution: ClientSolutionType;
  index: number;
}

const SolutionCard = ({ solution, index }: SolutionCardProps) => {
  return (
    <motion.div 
      className="bg-primary-light p-8 rounded-lg"
      style={{ backgroundColor: 'hsl(220, 47%, 28%)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="text-accent text-4xl mb-6">
        <i className={solution.icon}></i>
      </div>
      <h3 className="font-heading text-2xl font-bold text-white mb-4">{solution.title}</h3>
      <p className="text-white opacity-90 mb-6">{solution.description}</p>
      <ul className="space-y-3 mb-6">
        {solution.benefits.slice(0, 4).map((benefit, idx) => (
          <li key={idx} className="flex items-start">
            <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
            <span className="text-white opacity-90">{benefit}</span>
          </li>
        ))}
      </ul>
      <Link href={`#${solution.id}`}>
        <motion.a
          className="inline-block bg-white text-primary hover:bg-gray-light font-medium py-2 px-6 rounded-md transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.a>
      </Link>
    </motion.div>
  );
};

interface DetailedSolutionProps {
  solution: ClientSolutionType;
  isEven: boolean;
}

const DetailedSolution = ({ solution, isEven }: DetailedSolutionProps) => {
  return (
    <section id={solution.id} className={`py-16 ${isEven ? 'bg-gray-light' : 'bg-white'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {isEven ? (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 bg-accent text-white rounded-full mb-3">Tailored Solution</span>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">{solution.title}</h2>
                <p className="text-secondary mb-6">{solution.description}</p>
                
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Key Benefits</h3>
                <ul className="space-y-3 mb-6">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                      <span className="text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Our Approach</h3>
                <ul className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-star text-accent mt-1 mr-3"></i>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={solution.imageUrl} 
                  alt={solution.title} 
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-2 lg:order-1"
              >
                <img 
                  src={solution.imageUrl} 
                  alt={solution.title} 
                  className="rounded-lg shadow-lg w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="order-1 lg:order-2"
              >
                <span className="inline-block px-3 py-1 bg-accent text-white rounded-full mb-3">Tailored Solution</span>
                <h2 className="font-heading text-3xl font-bold text-primary mb-6">{solution.title}</h2>
                <p className="text-secondary mb-6">{solution.description}</p>
                
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Key Benefits</h3>
                <ul className="space-y-3 mb-6">
                  {solution.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                      <span className="text-secondary">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Our Approach</h3>
                <ul className="space-y-3">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <i className="fas fa-star text-accent mt-1 mr-3"></i>
                      <span className="text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientSolutions;
