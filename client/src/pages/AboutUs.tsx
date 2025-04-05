import { motion } from 'framer-motion';
import { useEffect } from 'react';

const team = [
  {
    name: 'Rajesh Sharma',
    position: 'Founder & CEO',
    bio: 'With over 20 years of experience in the construction industry, Rajesh leads Omav with a vision of quality and innovation.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Priya Patel',
    position: 'Chief Architect',
    bio: 'Priya brings creative design solutions with a focus on functionality and sustainability, having designed over 100 projects.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
  },
  {
    name: 'Amit Kumar',
    position: 'Construction Manager',
    bio: 'Amit ensures all projects are executed with precision and adherence to timelines with his methodical approach.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Sunita Jha',
    position: 'Interior Design Lead',
    bio: 'Specializing in creating spaces that balance aesthetics and functionality, Sunita has transformed countless interiors.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80'
  }
];

const values = [
  {
    title: 'Integrity',
    description: 'Ethical business practices and transparency with clients at every step.',
    icon: 'fas fa-handshake'
  },
  {
    title: 'Excellence',
    description: 'Commitment to superior quality and attention to detail in every project.',
    icon: 'fas fa-award'
  },
  {
    title: 'Innovation',
    description: 'Embracing modern techniques and technologies to build better and faster.',
    icon: 'fas fa-lightbulb'
  },
  {
    title: 'Sustainability',
    description: 'Environmentally responsible construction, using eco-friendly materials and methods where possible.',
    icon: 'fas fa-leaf'
  }
];

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us - Omav Construction';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Omav Constructions</h1>
            <p className="text-lg md:text-xl opacity-90">
              Building excellence and trust since 2011
            </p>
          </div>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Our Story & Mission</h2>
              <p className="text-secondary mb-4">
                Founded in 2011, Omav Construction began with a simple yet powerful vision - to deliver construction projects that exceed client expectations in quality, durability, and aesthetics.
              </p>
              <p className="text-secondary mb-4">
                What started as a small team of passionate builders has grown into a comprehensive construction company serving clients across East and North India. Through every project, we've maintained our core commitment to excellence and innovation.
              </p>
              <p className="text-secondary font-medium">
                Our mission is to deliver durable, innovative constructions that exceed client expectations in East and North India, creating spaces that enhance lives and communities.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80" 
                alt="Omav Construction team at work" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-secondary max-w-3xl mx-auto">
              These principles guide our decisions, shape our culture, and define how we engage with clients and communities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-accent text-3xl mb-4">
                  <i className={value.icon}></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-secondary">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Our Leadership Team</h2>
            <p className="text-secondary max-w-3xl mx-auto">
              Meet the experienced professionals who lead Omav Construction with expertise, passion, and vision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-primary">{member.name}</h3>
                  <p className="text-accent font-medium mb-3">{member.position}</p>
                  <p className="text-secondary text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Regions & Industries */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold mb-6">Service Regions & Industries</h2>
              <p className="mb-6 opacity-90">
                Omav Construction proudly serves East and North India, with primary operations in Bihar, Jharkhand, West Bengal, Delhi-NCR, and Uttar Pradesh. Our established presence in these regions allows us to understand local regulations, materials, and construction practices.
              </p>
              <p className="opacity-90">
                We cater to diverse clientele including individual homeowners building their dream homes, real estate developers creating residential and commercial complexes, and institutional clients such as schools, hospitals, and corporate offices.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Map of service regions" 
                className="w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-4">Our Achievements</h2>
            <p className="text-secondary max-w-3xl mx-auto">
              Milestones that mark our journey of excellence in the construction industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent font-bold text-4xl lg:text-5xl font-accent mb-2">150+</div>
              <div className="text-secondary">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-accent font-bold text-4xl lg:text-5xl font-accent mb-2">12+</div>
              <div className="text-secondary">Years of Excellence</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent font-bold text-4xl lg:text-5xl font-accent mb-2">5</div>
              <div className="text-secondary">Industry Awards</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-accent font-bold text-4xl lg:text-5xl font-accent mb-2">50+</div>
              <div className="text-secondary">Professional Team Members</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Interested in working with us?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              View our portfolio or schedule a free consultation to discuss your project needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/projects" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200">
                View Our Portfolio
              </a>
              <a href="/contact" className="bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200">
                Schedule a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
