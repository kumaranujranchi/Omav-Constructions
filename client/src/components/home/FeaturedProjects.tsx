import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import ProjectCard from '../common/ProjectCard';
import { type Project } from '@shared/schema';

type ProjectCategory = 'all' | 'residential' | 'commercial' | 'institutional';

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });
  
  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.projectType === activeFilter
  );

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Our Featured Projects
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Explore our portfolio of successful residential, commercial, and institutional 
            projects across East and North India.
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
          <div className="text-center py-12">Loading projects...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            Error loading projects. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/projects">
            <motion.a
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.a>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface FilterButtonProps {
  category: ProjectCategory;
  activeFilter: ProjectCategory;
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

export default FeaturedProjects;
