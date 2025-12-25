import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Clock, CheckCircle, ArrowLeft, 
  ChevronLeft, ChevronRight, X, Building2, Home, School
} from 'lucide-react';
import { type Project, type TimelineEntry } from '@shared/schema';

const ProjectDetail = () => {
  const [, params] = useRoute('/projects/:id');
  const projectId = params?.id ? parseInt(params.id) : 0;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ['/api/projects', projectId],
    enabled: projectId > 0,
  });

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Omav OP Constructions`;
    }
    window.scrollTo(0, 0);
  }, [project]);

  const timeline: TimelineEntry[] = project?.timeline 
    ? JSON.parse(project.timeline) 
    : [];

  const images = project?.images || [project?.imageUrl].filter(Boolean) as string[];

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'residential':
        return <Home className="w-5 h-5" />;
      case 'commercial':
        return <Building2 className="w-5 h-5" />;
      case 'institutional':
        return <School className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-secondary">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Project Not Found</h2>
          <p className="text-secondary mb-6">The project you're looking for doesn't exist.</p>
          <Link href="/projects">
            <span className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const isRunning = project.status === 'running';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <Link href="/projects">
            <span className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
              Back to All Projects
            </span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={images[currentImageIndex]} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
              data-testid="button-prev-image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition-colors"
              data-testid="button-next-image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  data-testid={`button-image-dot-${idx}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                isRunning ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
              }`}>
                {isRunning ? <Clock className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                {isRunning ? 'Running Project' : 'Completed Project'}
              </span>
              <span className="px-4 py-2 rounded-full text-sm font-medium bg-white/90 text-primary flex items-center gap-2 capitalize">
                {getProjectTypeIcon(project.projectType)}
                {project.projectType}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8"
              >
                <h2 className="font-heading text-2xl font-bold text-primary mb-4">About This Project</h2>
                <div className="text-secondary leading-relaxed prose prose-sm max-w-none">
                  {(project.fullDescription || project.description || '').split('\n\n').map((paragraph, idx) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return <h3 key={idx} className="font-heading text-lg font-bold text-primary mt-6 mb-3">{paragraph.replace(/\*\*/g, '')}</h3>;
                    }
                    if (paragraph.includes('**') && paragraph.includes(':')) {
                      const title = paragraph.match(/\*\*(.*?)\*\*/)?.[1] || '';
                      return <h3 key={idx} className="font-heading text-lg font-bold text-primary mt-6 mb-3">{title}</h3>;
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                      return (
                        <ul key={idx} className="list-disc list-inside space-y-1 ml-2 mb-4">
                          {items.map((item, i) => (
                            <li key={i} className="text-secondary">{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={idx} className="mb-4">{paragraph}</p>;
                  })}
                </div>
              </motion.div>

              {/* Timeline Section */}
              {timeline.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 md:p-8"
                >
                  <h2 className="font-heading text-2xl font-bold text-primary mb-6">Project Timeline</h2>
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
                    
                    {timeline.map((entry, index) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="relative pl-12 md:pl-16 pb-8 last:pb-0"
                      >
                        {/* Timeline Dot */}
                        <div className={`absolute left-2 md:left-4 w-5 h-5 rounded-full border-4 ${
                          index === timeline.length - 1 && isRunning
                            ? 'bg-orange-500 border-orange-200 animate-pulse'
                            : 'bg-accent border-accent/20'
                        }`} />
                        
                        <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-accent">{entry.date}</span>
                            {index === timeline.length - 1 && isRunning && (
                              <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">
                                Current Phase
                              </span>
                            )}
                          </div>
                          <h3 className="font-heading text-lg font-bold text-primary mb-2">
                            {entry.title}
                          </h3>
                          <p className="text-secondary text-sm">
                            {entry.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Project Details</h3>
                
                <div className="space-y-4">
                  {project.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-secondary">Location</p>
                        <p className="font-medium text-primary">{project.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.startDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="text-sm text-secondary">Start Date</p>
                        <p className="font-medium text-primary">{project.startDate}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.completedDate && (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-secondary">Completed</p>
                        <p className="font-medium text-primary">{project.completedDate}</p>
                      </div>
                    </div>
                  )}
                  
                  {isRunning && (
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-secondary">Status</p>
                        <p className="font-medium text-orange-500">In Progress</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t mt-6 pt-6">
                  <Link href="/contact">
                    <span className="block w-full bg-accent hover:bg-amber-600 text-white text-center py-3 rounded-lg font-medium transition-colors cursor-pointer">
                      Discuss Your Project
                    </span>
                  </Link>
                </div>
              </motion.div>

              {/* Photo Gallery Thumbnails */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6 mt-6"
                >
                  <h3 className="font-heading text-xl font-bold text-primary mb-4">Photo Gallery</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedImage(img);
                          setCurrentImageIndex(idx);
                        }}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          idx === currentImageIndex ? 'border-accent' : 'border-transparent'
                        }`}
                        data-testid={`button-gallery-${idx}`}
                      >
                        <img 
                          src={img} 
                          alt={`${project.title} - Photo ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              data-testid="button-close-modal"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImage} 
              alt="Full size"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
