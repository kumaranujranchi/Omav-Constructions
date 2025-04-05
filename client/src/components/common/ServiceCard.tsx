import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ServiceType } from '@/lib/types';

interface ServiceCardProps {
  service: ServiceType;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-accent h-full">
      <div className="text-primary bg-gray-light rounded-full w-16 h-16 flex items-center justify-center mb-4">
        <i className={`${service.icon} text-2xl`}></i>
      </div>
      <h3 className="font-heading text-xl font-bold text-primary mb-3">{service.title}</h3>
      <p className="text-secondary mb-4">{service.shortDescription}</p>
      <Link href={`/services/${service.id}`}>
        <motion.a 
          className="text-accent hover:text-amber-600 font-medium flex items-center"
          whileHover={{ x: 5 }}
        >
          Learn More <i className="fas fa-arrow-right ml-2"></i>
        </motion.a>
      </Link>
    </div>
  );
};

export default ServiceCard;
