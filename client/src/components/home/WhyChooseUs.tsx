import { motion } from 'framer-motion';

const valuePropositions = [
  {
    icon: 'fas fa-clipboard-check',
    title: 'Transparent Process',
    description: 'No hidden costs, clear contracts, and regular progress updates. We believe in building trust through openness.'
  },
  {
    icon: 'fas fa-medal',
    title: 'Quality Assurance',
    description: 'Experienced engineers and strict quality checks on every project stage, ensuring durability and safety.'
  },
  {
    icon: 'fas fa-clock',
    title: 'On-Time Delivery',
    description: 'Efficient project management to meet deadlines – crucial for both homeowners and commercial clients.'
  },
  {
    icon: 'fas fa-tools',
    title: 'End-to-End Solutions',
    description: 'From architecture and permits to interiors, a one-stop solution for all your construction needs.'
  }
];

const WhyChooseUs = () => {
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">Why Choose Omav OP Constructions</h2>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            Our commitment to excellence and client satisfaction sets us apart in the construction industry.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuePropositions.map((item, index) => (
            <motion.div 
              key={index} 
              className="bg-primary-light p-6 rounded-lg"
              style={{ backgroundColor: 'hsl(220, 47%, 28%)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4 text-accent text-4xl">
                <i className={item.icon}></i>
              </div>
              <h3 className="font-heading text-xl font-bold mb-3">{item.title}</h3>
              <p className="opacity-90">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
