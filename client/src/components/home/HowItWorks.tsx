import { motion } from 'framer-motion';

const processSteps = [
  {
    number: 1,
    title: 'Requirements Gathering',
    description: 'We begin with a detailed consultation to understand your vision, requirements, and budget constraints, creating a solid foundation for your project.',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    number: 2,
    title: 'Design & Quotation',
    description: 'Our architects and designers create detailed plans and 3D visualizations, accompanied by a transparent, itemized quotation for your approval.',
    imageUrl: 'https://images.unsplash.com/photo-1574964250186-74d8036dee1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    number: 3,
    title: 'Execution & Tracking',
    description: 'Once approved, our skilled team begins construction with regular quality checks and progress updates, ensuring adherence to timelines and standards.',
    imageUrl: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
  },
  {
    number: 4,
    title: 'Handover & Support',
    description: 'Following a thorough final inspection, we hand over your completed project with all documentation and provide ongoing maintenance support.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80'
  }
];

const HowItWorks = () => {
  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Our Construction Process
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            A transparent, step-by-step approach from initial consultation to project handover.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent-light z-0" 
              style={{ backgroundColor: 'hsl(35, 90%, 80%)' }}></div>
          
          <div className="space-y-12 relative z-10">
            {processSteps.map((step, index) => (
              <motion.div 
                key={step.number}
                className="md:flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                      <h3 className="font-heading text-2xl font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-secondary">{step.description}</p>
                    </div>
                    <div className="md:w-12 md:mx-auto relative">
                      <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12 hidden md:block">
                      <img 
                        src={step.imageUrl}
                        alt={step.title} 
                        className="rounded-lg shadow-md h-48 w-full object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 hidden md:block">
                      <img 
                        src={step.imageUrl}
                        alt={step.title} 
                        className="rounded-lg shadow-md h-48 w-full object-cover"
                      />
                    </div>
                    <div className="md:w-12 md:mx-auto relative">
                      <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <h3 className="font-heading text-2xl font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-secondary">{step.description}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
