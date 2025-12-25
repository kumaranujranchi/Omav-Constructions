import { useState } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { type Project } from '@shared/schema';

type StatusFilter = 'all' | 'running' | 'completed';

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });
  
  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.status === activeFilter
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
        
        {/* Status Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          <StatusTab 
            status="all" 
            activeFilter={activeFilter} 
            onClick={() => setActiveFilter('all')}
          >
            All Projects
          </StatusTab>
          <StatusTab 
            status="running" 
            activeFilter={activeFilter} 
            onClick={() => setActiveFilter('running')}
            icon={<Clock className="w-4 h-4" />}
          >
            Running
          </StatusTab>
          <StatusTab 
            status="completed" 
            activeFilter={activeFilter} 
            onClick={() => setActiveFilter('completed')}
            icon={<CheckCircle className="w-4 h-4" />}
          >
            Completed
          </StatusTab>
        </div>
        
        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-secondary">Loading projects...</p>
          </div>
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
            <motion.span
              className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
            </motion.span>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface StatusTabProps {
  status: StatusFilter;
  activeFilter: StatusFilter;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const StatusTab = ({ status, activeFilter, onClick, children, icon }: StatusTabProps) => {
  const isActive = status === activeFilter;
  
  return (
    <motion.button
      className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all ${
        isActive 
          ? 'bg-primary text-white' 
          : 'bg-gray-light text-secondary-dark hover:bg-primary hover:text-white'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid={`featured-tab-${status}`}
    >
      {icon}
      {children}
    </motion.button>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const isRunning = project.status === 'running';
  
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.div
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group h-full"
        whileHover={{ y: -5 }}
        data-testid={`featured-card-project-${project.id}`}
      >
        <div className="relative h-56 overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${
            isRunning 
              ? 'bg-orange-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {isRunning ? (
              <>
                <Clock className="w-3 h-3" />
                Running
              </>
            ) : (
              <>
                <CheckCircle className="w-3 h-3" />
                Completed
              </>
            )}
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-white/90 text-primary capitalize">
            {project.projectType}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          <p className="text-secondary text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {project.location && (
            <div className="flex items-center gap-1 text-sm text-secondary mb-4">
              <MapPin className="w-4 h-4 text-accent" />
              {project.location}
            </div>
          )}
          
          <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default FeaturedProjects;
