import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { processSteps } from '@/lib/constants';

const HowItWorks = () => {
  useEffect(() => {
    document.title = 'How It Works - Omav Construction';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" 
            alt="Construction Process" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Construction Process</h1>
            <p className="text-lg md:text-xl opacity-90">
              A transparent, step-by-step approach from initial consultation to project handover
            </p>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">How We Work</h2>
            <p className="text-lg text-secondary">
              At Omav Construction, we follow a systematic approach to ensure every project is executed with precision, transparency, and client satisfaction. Our proven process has been refined over 12+ years in the industry, delivering consistent results for our diverse clientele.
            </p>
          </motion.div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-accent-light z-0" 
                style={{ backgroundColor: 'hsl(35, 90%, 80%)' }}></div>
            
            <div className="space-y-16 relative z-10">
              {processSteps.map((step, index) => (
                <motion.div 
                  key={step.number}
                  className="md:flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                        <span className="inline-block px-3 py-1 bg-accent text-white rounded-full mb-3">Step {step.number}</span>
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
                          className="h-64 w-full object-contain bg-white"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 hidden md:block">
                        <img 
                          src={step.imageUrl}
                          alt={step.title} 
                          className="h-64 w-full object-contain bg-white"
                        />
                      </div>
                      <div className="md:w-12 md:mx-auto relative">
                        <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                          {step.number}
                        </div>
                      </div>
                      <div className="md:w-1/2 md:pl-12">
                        <span className="inline-block px-3 py-1 bg-accent text-white rounded-full mb-3">Step {step.number}</span>
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

      {/* Detailed Process */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Detailed Process Breakdown</h2>
            <p className="text-lg text-secondary">
              Each step of our process is designed to ensure quality, transparency, and client satisfaction
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* Step 1 Detail */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-start md:items-center flex-col md:flex-row">
                <div className="bg-accent text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  1
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">Requirements Gathering</h3>
              </div>
              <div className="mt-6 md:pl-18">
                <p className="text-secondary mb-4">
                  Our process begins with an in-depth consultation where we listen to your vision, requirements, and constraints. This crucial step forms the foundation of your project.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What We Do:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Conduct detailed client interviews</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Assess site conditions and constraints</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Document functional and aesthetic preferences</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Establish preliminary budget parameters</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">A dedicated project manager</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Initial project feasibility assessment</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Preliminary timeline estimates</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Clear understanding of next steps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2 Detail */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start md:items-center flex-col md:flex-row">
                <div className="bg-accent text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  2
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">Design & Quotation</h3>
              </div>
              <div className="mt-6 md:pl-18">
                <p className="text-secondary mb-4">
                  Based on your requirements, our architects and designers create detailed plans while our estimation team prepares a comprehensive quotation for your project.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What We Do:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Develop architectural concept designs</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Create detailed construction drawings</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Generate 3D visualizations</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Prepare itemized cost estimates</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Detailed project designs and blueprints</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">3D visualization of your project</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Transparent, itemized quotation</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Opportunity for design revisions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 Detail */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-start md:items-center flex-col md:flex-row">
                <div className="bg-accent text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  3
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">Execution & Tracking</h3>
              </div>
              <div className="mt-6 md:pl-18">
                <p className="text-secondary mb-4">
                  With approved designs and quotations, our construction team begins work, following strict quality protocols and providing regular progress updates.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What We Do:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Assemble specialized construction teams</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Source high-quality materials</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Implement construction plans with precision</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Conduct regular quality checks</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Weekly progress reports</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Site visit opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Regular photo/video documentation</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Transparent communication about any issues</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 Detail */}
            <motion.div 
              className="bg-white p-8 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-start md:items-center flex-col md:flex-row">
                <div className="bg-accent text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                  4
                </div>
                <h3 className="font-heading text-2xl font-bold text-primary">Handover & Support</h3>
              </div>
              <div className="mt-6 md:pl-18">
                <p className="text-secondary mb-4">
                  Following a thorough final inspection, we hand over your completed project with all documentation and provide ongoing maintenance support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What We Do:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Conduct comprehensive quality inspections</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Address any final adjustments</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Complete all finishing touches</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Prepare handover documentation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-primary mb-3">What You Get:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Complete project handover</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">All necessary documentation and warranties</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Post-construction maintenance support</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                        <span className="text-secondary">Guidance on care and maintenance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-secondary">
              Common questions about our construction process
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">How long does the typical construction process take?</h3>
              <p className="text-secondary">
                The timeline varies based on project scope and complexity. A typical residential project might take 6-12 months from initial consultation to handover, while commercial projects may take 12-24 months. We provide detailed timelines during the quotation phase.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Can I make changes to the design after the project has started?</h3>
              <p className="text-secondary">
                Yes, we understand that changes may be necessary. Minor changes can often be accommodated, while significant changes may impact timeline and budget. We handle all changes through a formal change order process to ensure transparency.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">How do you ensure quality throughout the construction process?</h3>
              <p className="text-secondary">
                Quality control is integral to our process. We employ experienced supervisors, use premium materials, conduct regular inspections, and follow industry best practices. Our multi-stage quality assurance checks occur throughout the project lifecycle.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">What kind of post-construction support do you provide?</h3>
              <p className="text-secondary">
                We offer comprehensive post-construction support including warranty coverage for workmanship, guidance on maintenance, assistance with any issues that may arise, and optional maintenance contracts for ongoing care of your property.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to start your construction journey?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your project and experience our seamless construction process firsthand.
            </p>
            <Link href="/contact" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
              Get a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
