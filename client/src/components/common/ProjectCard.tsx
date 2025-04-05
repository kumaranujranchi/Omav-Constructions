import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { type Project } from '@shared/schema';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'residential':
        return 'bg-accent';
      case 'commercial':
        return 'bg-primary';
      case 'institutional':
        return 'bg-secondary';
      default:
        return 'bg-accent';
    }
  };

  const getCategoryLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-full"
      whileHover={{ y: -5 }}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={project.imageUrl}
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-110 transition duration-700"
        />
        <div className={`absolute bottom-0 left-0 ${getCategoryColor(project.projectType)} text-white py-1 px-3 font-medium`}>
          {getCategoryLabel(project.projectType)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-primary mb-2">{project.title}</h3>
        <p className="text-secondary mb-4">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-secondary-dark">
            <i className="fas fa-calendar-alt mr-1"></i> Completed: {project.completedDate}
          </span>
          <Link href={`/projects/${project.id}`}>
            <a className="text-accent hover:text-amber-600 font-medium">View Details</a>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
