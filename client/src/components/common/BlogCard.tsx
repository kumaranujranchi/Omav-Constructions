import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BlogPostType } from '@/lib/types';

interface BlogCardProps {
  post: BlogPostType;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 h-full"
      whileHover={{ y: -5 }}
    >
      <img 
        src={post.imageUrl}
        alt={post.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="text-secondary-dark text-sm mb-2">
          <i className="far fa-calendar-alt mr-2"></i> {post.date}
        </div>
        <h4 className="font-heading text-lg font-bold text-primary mb-3">{post.title}</h4>
        <p className="text-secondary mb-4 line-clamp-2">{post.excerpt}</p>
        <Link href={`/resources/articles/${post.id}`}>
          <a className="text-accent hover:text-amber-600 font-medium">Read More</a>
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
