import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { MapPin, Calendar, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { type Project } from '@shared/schema';

type StatusFilter = 'all' | 'running' | 'completed';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  
  useEffect(() => {
    document.title = 'Projects - Omav OP Constructions';
    window.scrollTo(0, 0);
  }, []);

  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filteredProjects = projects?.filter(project => 
    activeFilter === 'all' || project.status === activeFilter
  );

  const runningCount = projects?.filter(p => p.status === 'running').length || 0;
  const completedCount = projects?.filter(p => p.status === 'completed').length || 0;

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

          {/* Status Tabs */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            <StatusTab 
              status="all" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('all')}
              count={projects?.length || 0}
            >
              All Projects
            </StatusTab>
            <StatusTab 
              status="running" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('running')}
              count={runningCount}
              icon={<Clock className="w-4 h-4" />}
            >
              Running
            </StatusTab>
            <StatusTab 
              status="completed" 
              activeFilter={activeFilter} 
              onClick={() => setActiveFilter('completed')}
              count={completedCount}
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

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to start your project?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your construction needs and join our list of satisfied clients.
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

interface StatusTabProps {
  status: StatusFilter;
  activeFilter: StatusFilter;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
  icon?: React.ReactNode;
}

const StatusTab = ({ status, activeFilter, onClick, children, count, icon }: StatusTabProps) => {
  const isActive = status === activeFilter;
  
  return (
    <motion.button
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-primary text-white shadow-lg' 
          : 'bg-gray-100 text-secondary-dark hover:bg-gray-200'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      data-testid={`tab-${status}`}
    >
      {icon}
      {children}
      <span className={`px-2 py-0.5 rounded-full text-sm ${
        isActive ? 'bg-white/20' : 'bg-gray-200'
      }`}>
        {count}
      </span>
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
        data-testid={`card-project-${project.id}`}
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
          
          <div className="flex flex-wrap gap-3 text-sm text-secondary mb-4">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-accent" />
                {project.location}
              </div>
            )}
            {project.startDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-accent" />
                Started: {project.startDate}
              </div>
            )}
          </div>
          
          <div className="flex items-center text-accent font-medium group-hover:gap-2 transition-all">
            View Details
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Projects;
