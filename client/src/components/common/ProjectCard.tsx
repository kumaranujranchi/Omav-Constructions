import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { type Project } from '@shared/schema';

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

export default ProjectCard;
