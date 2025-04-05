import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Project } from '@shared/schema';

const ProjectDetail = () => {
  const [, params] = useRoute('/projects/:id');
  const [similar, setSimilar] = useState<Project[]>([]);
  
  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: [`/api/projects/${params?.id}`],
    enabled: !!params?.id,
  });
  
  const { data: allProjects } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (project && allProjects) {
      const similarProjects = allProjects
        .filter(p => p.id !== project.id && p.projectType === project.projectType)
        .slice(0, 3);
      setSimilar(similarProjects);
      document.title = `${project.title} - Omav Construction`;
    }
  }, [project, allProjects]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-secondary">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-20 text-center">
        <h2 className="font-heading text-3xl font-bold text-primary mb-4">Project Not Found</h2>
        <p className="text-secondary mb-8">The project you're looking for may have been moved or doesn't exist.</p>
        <Link href="/projects">
          <a className="bg-primary text-white py-2 px-6 rounded-md hover:bg-primary-light transition duration-200">
            View All Projects
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0">
          <img 
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-accent text-white py-1 px-3 rounded mb-4 capitalize">
              {project.projectType}
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg md:text-xl opacity-90">{project.description}</p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-gray-light py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center text-sm">
            <Link href="/">
              <a className="text-secondary hover:text-primary">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/projects">
              <a className="text-secondary hover:text-primary">Projects</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{project.title}</span>
          </div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-6">Project Overview</h2>
              
              <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
                <img 
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">About This Project</h3>
                <p className="text-secondary mb-4">
                  {project.description}
                </p>
                <p className="text-secondary">
                  This project showcases our commitment to quality construction, innovative design, and client satisfaction. Our team worked diligently to ensure every aspect of the project met the highest standards and fulfilled the client's requirements.
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Project Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">Completed on {project.completedDate}</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">Delivered on schedule and within budget</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">Used high-quality, durable materials</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">Implemented sustainable construction practices</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-accent mt-1 mr-3"></i>
                    <span className="text-secondary">Client reported high satisfaction with the results</span>
                  </li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Project Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((index) => (
                    <img 
                      key={index}
                      src={`${project.imageUrl}?random=${index}`}
                      alt={`${project.title} - Gallery Image ${index}`}
                      className="rounded-lg shadow-md w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">Client Testimonial</h3>
                <div className="bg-gray-light p-6 rounded-lg">
                  <div className="text-accent text-2xl mb-4">
                    <i className="fas fa-quote-left"></i>
                  </div>
                  <p className="text-secondary italic mb-4">
                    "Working with Omav Construction on this project was an excellent experience. Their team demonstrated professionalism, expertise, and dedication throughout the process. The final result exceeded our expectations, and we would highly recommend their services."
                  </p>
                  <div className="font-heading font-bold text-primary">- Satisfied Client</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Project Sidebar */}
              <div className="bg-gray-light p-6 rounded-lg mb-8">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Project Information</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-secondary-dark font-medium">Project Type:</span>
                    <span className="text-secondary capitalize">{project.projectType}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark font-medium">Completion Date:</span>
                    <span className="text-secondary">{project.completedDate}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark font-medium">Location:</span>
                    <span className="text-secondary">East India</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark font-medium">Services Provided:</span>
                    <span className="text-secondary">Construction, Design</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-6 border border-gray mb-8">
                <h3 className="font-heading text-xl font-bold text-primary mb-4">Interested in a Similar Project?</h3>
                <p className="text-secondary mb-4">
                  Contact us to discuss your project needs and how we can help bring your vision to life.
                </p>
                <Link href="/contact">
                  <a className="block bg-accent text-white text-center py-3 rounded-md hover:bg-amber-600 transition duration-200">
                    Request a Quote
                  </a>
                </Link>
              </div>
              
              <div className="bg-primary text-white p-6 rounded-lg">
                <h3 className="font-heading text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/services/residential">
                      <a className="flex items-center hover:text-accent transition duration-200">
                        <i className="fas fa-angle-right mr-2"></i>
                        <span>Residential Construction</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/architectural">
                      <a className="flex items-center hover:text-accent transition duration-200">
                        <i className="fas fa-angle-right mr-2"></i>
                        <span>Architectural Design</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/interior">
                      <a className="flex items-center hover:text-accent transition duration-200">
                        <i className="fas fa-angle-right mr-2"></i>
                        <span>Interior Design</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/consultancy">
                      <a className="flex items-center hover:text-accent transition duration-200">
                        <i className="fas fa-angle-right mr-2"></i>
                        <span>Building Consultancy</span>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Similar Projects */}
      {similar.length > 0 && (
        <section className="py-16 bg-gray-light">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                Similar Projects
              </h2>
              <p className="text-secondary max-w-3xl mx-auto">
                Explore more of our {project.projectType} projects
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similar.map((similarProject, index) => (
                <motion.div 
                  key={similarProject.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img 
                    src={similarProject.imageUrl}
                    alt={similarProject.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-primary mb-2">
                      {similarProject.title}
                    </h3>
                    <p className="text-secondary mb-4">
                      {similarProject.description}
                    </p>
                    <Link href={`/projects/${similarProject.id}`}>
                      <a className="text-accent hover:text-amber-600 font-medium">
                        View Project Details
                      </a>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/projects">
                <a className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200">
                  View All Projects
                </a>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Ready to start your own project?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your construction needs and how we can deliver similar results for you.
            </p>
            <Link href="/contact">
              <a className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
                Get a Free Consultation
              </a>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
