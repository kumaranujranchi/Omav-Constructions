import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { resources } from '@/lib/constants';
import BlogCard from '@/components/common/BlogCard';

// Mock blog posts for display (used only for UI structure)
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
  },
  {
    id: 4,
    title: 'The Complete Guide to Green Building Practices',
    excerpt: 'Explore sustainable construction methods that reduce environmental impact while improving energy efficiency.',
    imageUrl: 'https://images.unsplash.com/photo-1518707399486-6d702a84ff00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'April 22, 2023'
  },
  {
    id: 5,
    title: 'How to Budget for Your Construction Project',
    excerpt: 'Practical tips for creating and managing a construction budget that prevents cost overruns.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'April 10, 2023'
  },
  {
    id: 6,
    title: 'Choosing the Right Contractor: A Checklist',
    excerpt: 'Essential questions to ask and factors to consider when selecting a construction contractor for your project.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: 'March 25, 2023'
  }
];

// Types for construction calculator
type CalculatorInputs = {
  area: string;
  propertyType: string;
  location: string;
  finishLevel: string;
};

type CalculatedResults = {
  baseCost: number;
  materialCost: number;
  laborCost: number;
  totalEstimate: number;
};

const Resources = () => {
  useEffect(() => {
    document.title = 'Resources & Tools - Omav Construction';
    window.scrollTo(0, 0);
  }, []);

  // State for construction calculator
  const [calculatorInputs, setCalculatorInputs] = useState<CalculatorInputs>({
    area: '',
    propertyType: '',
    location: '',
    finishLevel: ''
  });

  const [calculatedResults, setCalculatedResults] = useState<CalculatedResults | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCalculatorInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic calculation logic (this is just for demonstration)
    const area = parseFloat(calculatorInputs.area) || 0;
    
    // Base rates per square foot based on property type
    const baseRates: {[key: string]: number} = {
      residential: 1500,
      commercial: 2200,
      institutional: 2500
    };
    
    // Location multipliers
    const locationMultipliers: {[key: string]: number} = {
      patna: 1.0,
      delhi: 1.3,
      kolkata: 1.1
    };
    
    // Finish level multipliers
    const finishMultipliers: {[key: string]: number} = {
      standard: 1.0,
      premium: 1.3,
      luxury: 1.6
    };
    
    const baseRate = baseRates[calculatorInputs.propertyType] || 1500;
    const locationMultiplier = locationMultipliers[calculatorInputs.location] || 1.0;
    const finishMultiplier = finishMultipliers[calculatorInputs.finishLevel] || 1.0;
    
    const baseCost = area * baseRate;
    const materialCost = baseCost * 0.65 * locationMultiplier;
    const laborCost = baseCost * 0.35 * locationMultiplier;
    const totalEstimate = baseCost * locationMultiplier * finishMultiplier;
    
    setCalculatedResults({
      baseCost,
      materialCost,
      laborCost,
      totalEstimate
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Construction Resources and Tools" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Resources & Tools</h1>
            <p className="text-lg md:text-xl opacity-90">
              Helpful information and resources to assist you with your construction project
            </p>
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Construction Tools & Resources</h2>
            <p className="text-lg text-secondary">
              Utilize our specialized tools to help plan and execute your construction project effectively
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => (
              <motion.div 
                key={resource.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-primary text-4xl mb-4">
                  <i className={resource.icon}></i>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary mb-3">{resource.title}</h3>
                <p className="text-secondary mb-6">{resource.description}</p>
                {resource.id === 'cost-estimator' ? (
                  <button
                    onClick={() => setShowCalculator(true)}
                    className="inline-block bg-accent hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                  >
                    Use Calculator
                  </button>
                ) : (
                  <Link href={resource.link}>
                    <a className={`inline-block ${
                      resource.id === 'project-tracker' 
                        ? 'bg-primary hover:bg-primary-light' 
                        : 'bg-secondary hover:bg-secondary-dark'
                    } text-white font-medium py-2 px-6 rounded-md transition duration-200`}>
                      {resource.id === 'project-tracker' ? 'Client Login' : 'Browse Articles'}
                    </a>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Construction Cost Calculator Modal */}
          {showCalculator && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading text-2xl font-bold text-primary">Construction Cost Estimator</h3>
                    <button 
                      onClick={() => {
                        setShowCalculator(false);
                        setCalculatedResults(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times text-xl"></i>
                    </button>
                  </div>
                  
                  <p className="text-secondary mb-6">
                    This tool provides a rough estimate for construction costs based on basic parameters. For a detailed quote, please contact our team.
                  </p>
                  
                  <form onSubmit={calculateEstimate} className="space-y-4">
                    <div>
                      <label className="block text-secondary-dark mb-2">Property Area (in sq. ft.)*</label>
                      <input 
                        type="number" 
                        name="area"
                        value={calculatorInputs.area}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                        required
                        min="100"
                        placeholder="e.g., 1500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-secondary-dark mb-2">Property Type*</label>
                      <select 
                        name="propertyType"
                        value={calculatorInputs.propertyType}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Property Type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="institutional">Institutional</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-secondary-dark mb-2">Location*</label>
                      <select 
                        name="location"
                        value={calculatorInputs.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Location</option>
                        <option value="patna">Patna</option>
                        <option value="delhi">Delhi-NCR</option>
                        <option value="kolkata">Kolkata</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-secondary-dark mb-2">Finish Level*</label>
                      <select 
                        name="finishLevel"
                        value={calculatorInputs.finishLevel}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select Finish Level</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
                    >
                      Calculate Estimate
                    </button>
                  </form>
                  
                  {calculatedResults && (
                    <div className="mt-8 p-6 bg-gray-light rounded-lg">
                      <h4 className="font-heading text-xl font-bold text-primary mb-4">Estimated Construction Cost</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary-dark">Base Construction Cost:</span>
                          <span className="font-medium">₹{calculatedResults.baseCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-dark">Estimated Material Cost:</span>
                          <span className="font-medium">₹{calculatedResults.materialCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-dark">Estimated Labor Cost:</span>
                          <span className="font-medium">₹{calculatedResults.laborCost.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t border-gray flex justify-between">
                          <span className="text-primary font-bold">Total Estimate:</span>
                          <span className="text-primary font-bold">₹{calculatedResults.totalEstimate.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="mt-6 text-sm text-secondary">
                        <p><strong>Note:</strong> This is a preliminary estimate based on average costs. Actual construction costs may vary based on specific requirements, material selections, site conditions, and other factors. For a detailed and accurate quote, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
                      </div>
                      <div className="mt-6">
                        <Link href="/contact">
                          <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                            Request Detailed Quote
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Knowledge Center */}
      <section className="py-16 bg-gray-light">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Knowledge Center</h2>
            <p className="text-lg text-secondary">
              Educational articles, guides, and resources about construction, design tips, budgeting, and more
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Construction Guides</h3>
              <ul className="space-y-3">
                <li className="border-b border-gray-200 pb-2">
                  <Link href="/resources/guide/residential-construction">
                    <div className="flex items-center text-secondary hover:text-primary cursor-pointer">
                      <i className="fas fa-file-alt mr-3 text-accent"></i>
                      Complete Guide to Residential Construction
                    </div>
                  </Link>
                </li>
                <li className="border-b border-gray-200 pb-2">
                  <Link href="/resources/guide/material-selection">
                    <div className="flex items-center text-secondary hover:text-primary cursor-pointer">
                      <i className="fas fa-file-alt mr-3 text-accent"></i>
                      Selecting the Right Construction Materials
                    </div>
                  </Link>
                </li>
                <li className="border-b border-gray-200 pb-2">
                  <Link href="/resources/guide/building-permits">
                    <div className="flex items-center text-secondary hover:text-primary cursor-pointer">
                      <i className="fas fa-file-alt mr-3 text-accent"></i>
                      Understanding Building Permits and Regulations
                    </div>
                  </Link>
                </li>
                <li className="border-b border-gray-200 pb-2">
                  <Link href="/resources/guide/construction-timeline">
                    <div className="flex items-center text-secondary hover:text-primary cursor-pointer">
                      <i className="fas fa-file-alt mr-3 text-accent"></i>
                      Construction Timeline: What to Expect
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/resources/guide/construction-contracts">
                    <div className="flex items-center text-secondary hover:text-primary cursor-pointer">
                      <i className="fas fa-file-alt mr-3 text-accent"></i>
                      Understanding Construction Contracts
                    </div>
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">FAQs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-bold text-primary mb-1">How long does a typical construction project take?</h4>
                  <p className="text-secondary text-sm">The timeline varies based on project scope and complexity. Residential projects might take 6-12 months from initial consultation to handover, while commercial projects may take longer.</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary mb-1">What permits do I need for construction?</h4>
                  <p className="text-secondary text-sm">Most construction projects require building permits, which vary by location and project type. Our team handles the permit application process for all our projects.</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary mb-1">How can I estimate the cost of my construction project?</h4>
                  <p className="text-secondary text-sm">You can use our Construction Cost Estimator tool for a rough estimate. For a detailed quote, we recommend scheduling a consultation with our team.</p>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-primary mb-1">Do you provide warranties for your construction work?</h4>
                  <p className="text-secondary text-sm">Yes, we provide warranties on all our construction work. The specific coverage varies by project type and is detailed in your construction contract.</p>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/resources/faqs">
                  <div className="text-accent hover:text-amber-600 font-medium flex items-center cursor-pointer">
                    View All FAQs <i className="fas fa-arrow-right ml-2"></i>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl font-bold mb-4">Need More Information?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our team is ready to answer your questions and provide personalized assistance for your construction project.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
                Contact Us
              </Link>
              <Link href="/how-it-works" className="bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200 inline-block">
                Learn About Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
