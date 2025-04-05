import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProjectCard from '@/components/common/ProjectCard';
import { type Project } from '@shared/schema';

type ProjectType = 'all' | 'residential' | 'commercial' | 'institutional';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectType>('all');
  
  useEffect(() => {
    document.title = 'Projects - Omav Construction';
    window.scrollTo(0, 0);
  }, []);

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.projectType === activeFilter
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
            alt="Construction Projects" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Projects</h1>
            <p className="text-lg md:text-xl opacity-90">
              Explore our portfolio of successful projects across East and North India
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">
              Our Portfolio
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Browse through our diverse range of projects showcasing our expertise in residential, commercial, and institutional construction.
            </p>
          </motion.div>

          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <FilterButton 
              category="all" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </FilterButton>
            <FilterButton 
              category="residential" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('residential')}
            >
              Residential
            </FilterButton>
            <FilterButton 
              category="commercial" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('commercial')}
            >
              Commercial
            </FilterButton>
            <FilterButton 
              category="institutional" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('institutional')}
            >
              Institutional
            </FilterButton>
          </div>

          {/* Projects Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-secondary">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <i className="fas fa-exclamation-triangle text-3xl mb-4"></i>
              <p>Error loading projects. Please try again later.</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-secondary">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Categories Section */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">
              Our Project Categories
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Discover the different types of projects we specialize in
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
                <i className="fas fa-home"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Residential Projects</h3>
              <p className="text-secondary mb-4">
                Custom homes, villas, apartments, and residential complexes tailored to meet the unique needs of homeowners and real estate developers.
              </p>
              <button 
                onClick={() => setActiveFilter('residential')}
                className="text-accent hover:text-amber-600 font-medium flex items-center"
              >
                View Residential Projects <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-building"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Commercial Projects</h3>
              <p className="text-secondary mb-4">
                Office buildings, retail spaces, hotels, and mixed-use developments designed for functionality, aesthetic appeal, and business efficiency.
              </p>
              <button 
                onClick={() => setActiveFilter('commercial')}
                className="text-accent hover:text-amber-600 font-medium flex items-center"
              >
                View Commercial Projects <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent text-3xl mb-4">
                <i className="fas fa-school"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Institutional Projects</h3>
              <p className="text-secondary mb-4">
                Schools, hospitals, government buildings, and other institutional facilities that serve communities with specific infrastructure requirements.
              </p>
              <button 
                onClick={() => setActiveFilter('institutional')}
                className="text-accent hover:text-amber-600 font-medium flex items-center"
              >
                View Institutional Projects <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">
              What Our Clients Say
            </h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Feedback from satisfied clients about their project experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent text-2xl mb-4">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="text-secondary italic mb-4">
                "Omav Construction delivered our dream home with exceptional quality and professionalism. The team was responsive, transparent about costs, and finished ahead of schedule. We couldn't be happier with the results."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary">Rajesh Kumar</div>
                  <div className="text-secondary text-sm">Residential Client, Patna</div>
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
              <div className="text-accent text-2xl mb-4">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="text-secondary italic mb-4">
                "Working with Omav on our office complex was a seamless experience. Their attention to detail, innovative solutions, and commitment to deadlines made them the perfect partner for our commercial project."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary mr-4">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <div className="font-heading font-bold text-primary">Priya Singh</div>
                  <div className="text-secondary text-sm">Commercial Client, Delhi</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to start your project?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your construction needs and join our list of satisfied clients.
            </p>
            <a href="/contact" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
              Get a Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FilterButtonProps {
  category: ProjectType;
  activeFilter: ProjectType;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton = ({ category, activeFilter, onClick, children }: FilterButtonProps) => {
  const isActive = category === activeFilter;
  
  return (
    <motion.button
      className={`px-5 py-2 rounded-full ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-light text-secondary-dark hover:bg-primary hover:text-white transition duration-200'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default Projects;
