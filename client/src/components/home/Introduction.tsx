import { motion } from 'framer-motion';

const stats = [
  { value: '150+', label: 'Projects Completed' },
  { value: '100+', label: 'Satisfied Clients' },
  { value: '12+', label: 'Years of Experience' },
  { value: '50+', label: 'Team Members' }
];

const Introduction = () => {
  return (
    <section className="py-16 bg-gray-light">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Welcome to Omav Constructions
          </h2>
          <p className="text-lg text-secondary-dark">
            With 12+ years of experience, Omav Constructions is a leading construction company 
            specializing in comprehensive infrastructure development solutions across residential, 
            commercial, and institutional sectors. Our commitment to quality, innovation, and client 
            satisfaction makes us your trusted partner in building dreams.
          </p>
        </motion.div>
        
        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-accent font-accent font-bold text-4xl lg:text-5xl">
                {stat.value}
              </div>
              <div className="text-secondary mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Introduction;
