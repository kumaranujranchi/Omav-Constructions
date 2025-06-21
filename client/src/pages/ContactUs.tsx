import { useEffect, useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { z } from 'zod';

// Add CSS for dropdown
const dropdownStyles = `
  .dropdown:hover .dropdown-menu {
    display: block;
  }
`;

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email').optional(),
  city: z.string().min(1, 'Please enter your city'),
  landSize: z.string().min(1, 'Please enter land size in sq ft'),
  landDimensionNorthFeet: z.string().min(1, 'Please enter North side dimension in feet'),
  landDimensionNorthInches: z.string(),
  landDimensionSouthFeet: z.string().min(1, 'Please enter South side dimension in feet'),
  landDimensionSouthInches: z.string(),
  landDimensionEastFeet: z.string().min(1, 'Please enter East side dimension in feet'),
  landDimensionEastInches: z.string(),
  landDimensionWestFeet: z.string().min(1, 'Please enter West side dimension in feet'),
  landDimensionWestInches: z.string(),
  landFacing: z.string().min(1, 'Please select land facing direction'),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

const officeLocations = [
  {
    city: "Patna",
    address: "Above Pratibha Dental Clinic, Near Dream Jewel Apartment, R. K. Puram, Danapur, Patna, Bihar - 801503",
    phone: "+91 9155174333, +91 9934978469",
    email: "info@op.omavconstructions.com",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM",
    mapLink: "https://maps.app.goo.gl/eWiXp2uMX9bnnPJ27"
  }
];

const ContactUs = () => {
  useEffect(() => {
    document.title = 'Contact Us - Omav Constructions';
    window.scrollTo(0, 0);
    
    // Add dropdown styles
    const styleElement = document.createElement('style');
    styleElement.textContent = dropdownStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    city: '',
    landSize: '',
    landDimensionNorthFeet: '',
    landDimensionNorthInches: '0',
    landDimensionSouthFeet: '',
    landDimensionSouthInches: '0',
    landDimensionEastFeet: '',
    landDimensionEastInches: '0',
    landDimensionWestFeet: '',
    landDimensionWestInches: '0',
    landFacing: '',
    projectType: '',
    message: ''
  });
  const [activeLocation, setActiveLocation] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest('POST', '/api/contact', data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccessMessage(true);
      setValidationError(null);
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        landSize: '',
        landDimensionNorthFeet: '',
        landDimensionNorthInches: '0',
        landDimensionSouthFeet: '',
        landDimensionSouthInches: '0',
        landDimensionEastFeet: '',
        landDimensionEastInches: '0',
        landDimensionWestFeet: '',
        landDimensionWestInches: '0',
        landFacing: '',
        projectType: '',
        message: ''
      });
      
      // Hide success message after 8 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 8000);
    },
    onError: (error) => {
      setValidationError(error.message || "An unexpected error occurred. Please try again later.");
      setShowSuccessMessage(false);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      formSchema.parse(formData);
      mutation.mutate(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || 'Please check your form inputs';
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-card py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 to-transparent z-0"></div>
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Contact Us" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-card/80 backdrop-blur-sm py-8 px-6 rounded-lg shadow-md border border-border inline-block w-full">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-primary">Contact Us</h1>
              <p className="text-lg md:text-xl text-card-foreground">
                Get in touch with our team for consultations, quotes, or any inquiries
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              className="bg-card p-8 rounded-lg shadow-md border border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">Get a Free Quote</h2>
              <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="name">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="phone">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                    />
                  </div>
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="city">City (Construction) *</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-secondary-dark mb-2" htmlFor="landSize">Land Size (in Sq ft) *</label>
                  <input 
                    type="text" 
                    id="landSize" 
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                    required
                    placeholder="e.g., 1200"
                  />
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <label className="block text-secondary-dark mb-2">Land Dimensions (for all four sides) *</label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray rounded p-4">
                      <label className="block text-secondary-dark mb-2 font-semibold">North Side</label>
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionNorthFeet">Feet *</label>
                          <input 
                            type="number" 
                            id="landDimensionNorthFeet" 
                            name="landDimensionNorthFeet"
                            value={formData.landDimensionNorthFeet}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                            required
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionNorthInches">Inches</label>
                          <input 
                            type="number" 
                            id="landDimensionNorthInches" 
                            name="landDimensionNorthInches"
                            value={formData.landDimensionNorthInches}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            min="0"
                            max="11"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray rounded p-4">
                      <label className="block text-secondary-dark mb-2 font-semibold">South Side</label>
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionSouthFeet">Feet *</label>
                          <input 
                            type="number" 
                            id="landDimensionSouthFeet" 
                            name="landDimensionSouthFeet"
                            value={formData.landDimensionSouthFeet}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                            required
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionSouthInches">Inches</label>
                          <input 
                            type="number" 
                            id="landDimensionSouthInches" 
                            name="landDimensionSouthInches"
                            value={formData.landDimensionSouthInches}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            min="0"
                            max="11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray rounded p-4">
                      <label className="block text-secondary-dark mb-2 font-semibold">East Side</label>
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionEastFeet">Feet *</label>
                          <input 
                            type="number" 
                            id="landDimensionEastFeet" 
                            name="landDimensionEastFeet"
                            value={formData.landDimensionEastFeet}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                            required
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionEastInches">Inches</label>
                          <input 
                            type="number" 
                            id="landDimensionEastInches" 
                            name="landDimensionEastInches"
                            value={formData.landDimensionEastInches}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            min="0"
                            max="11"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray rounded p-4">
                      <label className="block text-secondary-dark mb-2 font-semibold">West Side</label>
                      <div className="flex items-center">
                        <div className="flex-1 mr-2">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionWestFeet">Feet *</label>
                          <input 
                            type="number" 
                            id="landDimensionWestFeet" 
                            name="landDimensionWestFeet"
                            value={formData.landDimensionWestFeet}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                            required
                            min="0"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-secondary-dark mb-1 text-sm" htmlFor="landDimensionWestInches">Inches</label>
                          <input 
                            type="number" 
                            id="landDimensionWestInches" 
                            name="landDimensionWestInches"
                            value={formData.landDimensionWestInches}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                            min="0"
                            max="11"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="landFacing">Land Facing Direction *</label>
                    <select 
                      id="landFacing" 
                      name="landFacing"
                      value={formData.landFacing}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="" disabled>Select Direction</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North-East">North-East</option>
                      <option value="North-West">North-West</option>
                      <option value="South-East">South-East</option>
                      <option value="South-West">South-West</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-secondary-dark mb-2" htmlFor="projectType">Project Type *</label>
                    <select 
                      id="projectType" 
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    >
                      <option value="" disabled>Select Project Type</option>
                      <option value="Residential Construction">Residential Construction</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Interior Design">Interior Design</option>
                      <option value="Architectural Design">Architectural Design</option>
                      <option value="Consultancy">Consultancy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-secondary-dark mb-2" htmlFor="message">Project Details</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit Request'}
                </button>
                <p className="text-xs text-secondary">
                  By submitting this form, you agree to our privacy policy and consent to be contacted regarding your inquiry.
                </p>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <div>
              <motion.div 
                className="bg-card p-8 rounded-lg shadow-md border border-border mb-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="font-heading text-2xl font-bold mb-6 text-primary">Contact Information</h2>
                
                {/* Office Locations Tabs */}
                <div className="flex border-b border-border mb-6">
                  {officeLocations.map((location, index) => (
                    <button 
                      key={index}
                      className={`py-2 px-4 font-medium ${activeLocation === index ? 'text-primary border-b-2 border-primary' : 'text-foreground opacity-80 hover:opacity-100'}`}
                      onClick={() => setActiveLocation(index)}
                    >
                      {location.city}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 mr-4">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-primary/90">Office Address</h4>
                      <p>{officeLocations[activeLocation].address}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 mr-4">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-primary/90">Phone Number</h4>
                      <p>{officeLocations[activeLocation].phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 mr-4">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-primary/90">Email Address</h4>
                      <p>{officeLocations[activeLocation].email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="text-primary text-xl mt-1 mr-4">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-primary/90">Working Hours</h4>
                      <p>{officeLocations[activeLocation].hours}</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-bold mb-3 text-primary/90">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-white text-primary hover:bg-gray-light w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="bg-white text-primary hover:bg-gray-light w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="bg-white text-primary hover:bg-gray-light w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a href="#" className="bg-white text-primary hover:bg-gray-light w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Map Section */}
              <motion.div 
                className="h-[300px] rounded-lg overflow-hidden shadow-lg bg-white relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative w-full h-full bg-white overflow-hidden rounded-lg shadow">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1798.847654719765!2d85.03875113508876!3d25.615039050146827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5666172f3205%3A0x873b36fca57c120!2sR%20K%20Puram%2C%20Patna%2C%20Danapur%2C%20Bihar%20801503!5e0!3m2!1sen!2sin!4v1743877793637!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Quick Contact Options</h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Choose the most convenient way to get in touch with our team
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-accent text-4xl mb-4">
                <i className="fas fa-phone-alt"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Call Us</h3>
              <p className="text-secondary mb-4">
                Speak directly with our customer service team for immediate assistance with your inquiries.
              </p>
              <div className="flex flex-col items-center justify-center space-y-2">
                <a 
                  href="tel:+919155174333" 
                  className="inline-block bg-accent hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                >
                  +91 9155174333
                </a>
                <a 
                  href="tel:+919934978469" 
                  className="inline-block bg-accent hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
                >
                  +91 9934978469
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-accent text-4xl mb-4">
                <i className="fas fa-envelope"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Email Us</h3>
              <p className="text-secondary mb-4">
                Send us a detailed message about your project requirements or any questions you may have.
              </p>
              <a 
                href="mailto:info@op.omavconstructions.com" 
                className="inline-block bg-primary hover:bg-primary-light text-white font-medium py-2 px-6 rounded-md transition duration-200"
              >
                info@op.omavconstructions.com
              </a>
            </motion.div>

            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-accent text-4xl mb-4">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Schedule a Visit</h3>
              <p className="text-secondary mb-4">
                Book an appointment to meet with our team for a personalized consultation at our office.
              </p>
              <a 
                href="#appointment-form" 
                className="inline-block bg-secondary hover:bg-secondary-dark text-white font-medium py-2 px-6 rounded-md transition duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: formRef.current?.offsetTop || 0,
                    behavior: 'smooth'
                  });
                }}
              >
                Book Appointment
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-secondary max-w-3xl mx-auto">
              Find answers to common questions about contacting and working with us
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">How quickly will I receive a response after submitting the contact form?</h3>
              <p className="text-secondary">
                We typically respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling our customer service line directly for immediate assistance.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">What information should I provide when requesting a quote?</h3>
              <p className="text-secondary">
                To provide an accurate quote, it helps if you include details about your project type, location, approximate size (in square feet), your timeline, and any specific requirements or preferences you have. The more information you provide, the more precise our initial estimate can be.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card p-6 rounded-lg shadow-md border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-heading text-xl font-bold text-primary mb-3">Do you serve areas outside of Patna?</h3>
              <p className="text-secondary">
                Yes, while our main office is in Patna, we serve clients throughout Bihar and neighboring states. We have successfully completed projects in Patna, Danapur, Muzaffarpur, Gaya, and other regions of Bihar. Please contact us to discuss your specific location.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <motion.div 
              className="mb-6 lg:mb-0 text-center lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-white font-heading text-2xl md:text-3xl font-bold">Ready to Start Your Project?</h2>
              <p className="text-white opacity-90 mt-2">Let's discuss your construction needs and bring your vision to life.</p>
            </motion.div>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={() => {
                  window.scrollTo({
                    top: formRef.current?.offsetTop || 0,
                    behavior: 'smooth'
                  });
                }}
                className="bg-white hover:bg-gray-light text-primary font-medium py-3 px-8 rounded-md transition duration-200"
              >
                Get a Free Quote
              </button>
              <div className="dropdown relative inline-block">
                <button 
                  className="bg-primary hover:bg-primary-light text-white font-medium py-3 px-8 rounded-md transition duration-200"
                >
                  <i className="fas fa-phone-alt mr-2"></i> Call Us
                </button>
                <div className="dropdown-menu hidden absolute z-10 right-0 mt-2 bg-card rounded-md shadow-lg border border-border p-2 space-y-1">
                  <a 
                    href="tel:+919155174333" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white rounded-md"
                  >
                    +91 9155174333
                  </a>
                  <a 
                    href="tel:+919934978469" 
                    className="block px-4 py-2 text-sm text-foreground hover:bg-primary hover:text-white rounded-md"
                  >
                    +91 9934978469
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
