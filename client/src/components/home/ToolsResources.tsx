import { motion } from 'framer-motion';
import { Link } from 'wouter';
import BlogCard from '../common/BlogCard';

const tools = [
  {
    icon: 'fas fa-calculator',
    title: 'Construction Cost Estimator',
    description: 'Get a quick estimate for your construction project based on size, location, and specifications.',
    link: '/resources/cost-estimator',
    buttonText: 'Use Calculator'
  },
  {
    icon: 'fas fa-tasks',
    title: 'Client Project Tracker',
    description: 'Existing clients can log in to track their project progress, view updates, and communicate with the team.',
    link: '/resources/project-tracker',
    buttonText: 'Client Login',
    variant: 'primary'
  },
  {
    icon: 'fas fa-book-open',
    title: 'Knowledge Center',
    description: 'Educational articles, guides, and FAQs about construction, design tips, budgeting, and more.',
    link: '/resources/knowledge-center',
    buttonText: 'Browse Articles',
    variant: 'secondary'
  }
];

const blogPosts = [
  {
    id: 1,
    title: '5 Tips for Choosing the Right Construction Material',
    excerpt: 'Learn how to select the best materials for your construction project that balance quality, cost, and sustainability.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80',
    date: 'June 15, 2023'
  },
  {
    id: 2,
    title: 'Understanding Construction Permits in Bihar',
    excerpt: 'A comprehensive guide to navigating the permit process for construction projects in Bihar.',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'May 28, 2023'
  },
  {
    id: 3,
    title: 'Interior Design Trends for 2023',
    excerpt: 'Discover the latest interior design trends that can transform your living or working space.',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'May 10, 2023'
  }
];

const ToolsResources = () => {
  return (
    <section id="resources" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            Tools & Resources
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Helpful tools and resources to assist you in planning your construction project.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-primary text-4xl mb-4">
                <i className={tool.icon}></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">{tool.title}</h3>
              <p className="text-secondary mb-6">{tool.description}</p>
              <Link href={tool.link}>
                <motion.a
                  className={`inline-block ${
                    tool.variant === 'primary' 
                      ? 'bg-primary hover:bg-primary-light' 
                      : tool.variant === 'secondary'
                        ? 'bg-secondary hover:bg-secondary-dark'
                        : 'bg-accent hover:bg-amber-600'
                  } text-white font-medium py-2 px-6 rounded-md transition duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tool.buttonText}
                </motion.a>
              </Link>
            </motion.div>
          ))}
        </div>
        
        {/* Recent Blog Posts */}
        <div className="mt-20">
          <h3 className="font-heading text-2xl font-bold text-primary mb-8 text-center">Recent Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/resources/knowledge-center">
              <motion.a
                className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Articles
              </motion.a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsResources;
