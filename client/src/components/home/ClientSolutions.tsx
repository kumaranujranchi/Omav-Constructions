import { motion } from 'framer-motion';
import { Link } from 'wouter';

const clientSolutions = [
  {
    id: 'homeowners',
    icon: 'fas fa-home',
    title: 'For Homeowners',
    benefits: [
      'Transparent budgeting with no hidden costs',
      'Personalized design that reflects your lifestyle',
      'Quality materials and craftsmanship',
      'Regular updates and site visits'
    ]
  },
  {
    id: 'developers',
    icon: 'fas fa-city',
    title: 'For Real Estate Developers',
    benefits: [
      'Scalable construction capabilities',
      'Regulatory compliance expertise',
      'Efficient project management',
      'Cost-effective material sourcing'
    ]
  },
  {
    id: 'commercial',
    icon: 'fas fa-building',
    title: 'For Commercial Clients',
    benefits: [
      'Customized commercial spaces',
      'Minimal business disruption',
      'Industry-specific solutions',
      'Energy-efficient design options'
    ]
  }
];

const ClientSolutions = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Tailored Solutions for Every Client
          </h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            We offer specialized construction solutions designed to meet the unique needs of different client segments.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clientSolutions.map((solution, index) => (
            <motion.div 
              key={solution.id}
              className="bg-primary-light p-8 rounded-lg"
              style={{ backgroundColor: 'hsl(220, 47%, 28%)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-accent text-4xl mb-6">
                <i className={solution.icon}></i>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-4">{solution.title}</h3>
              <ul className="space-y-3 mb-6">
                {solution.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/client-solutions#${solution.id}`}>
                <motion.a
                  className="inline-block bg-white text-primary hover:bg-gray-light font-medium py-2 px-6 rounded-md transition duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSolutions;
