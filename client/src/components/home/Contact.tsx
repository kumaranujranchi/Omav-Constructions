import { useState, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { motion } from 'framer-motion';
import { z } from 'zod';

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

const Contact = () => {
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
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll contact you shortly.",
      });
      
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
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
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
    <section id="contact" className="py-20 relative bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent z-0"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-card border border-border p-8 rounded-lg shadow-md max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-primary">Contact Us</h2>
            <p className="text-lg text-card-foreground max-w-2xl mx-auto">
              Ready to start your project? Get in touch with our team for a consultation or quote.
            </p>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-card p-8 rounded-lg shadow-md border border-border"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-heading text-2xl font-bold text-primary mb-6">Get a Free Quote</h3>
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
            </form>
          </motion.div>
          
          {/* Contact Information */}
          <div>
            <motion.div 
              className="bg-card border border-border p-8 rounded-lg shadow-md mb-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-heading text-2xl font-bold mb-6 text-primary">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-primary/90">Office Address</h4>
                    <p>Above Pratibha Dental Clinic, Near Dream Jewel Apartment, R. K. Puram, Danapur, Patna, Bihar. PIN Code: 801503</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-primary/90">Phone Number</h4>
                    <p>+91 9155174333</p>
                    <p>+91 7870374888</p>
                    <p>+91 7870314888</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-primary/90">Email Address</h4>
                    <p>info@omavconstructions.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-primary text-xl mt-1 mr-4">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-primary/90">Working Hours</h4>
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-bold mb-3 text-primary/90">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="bg-card/50 border border-border text-primary hover:bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="bg-card/50 border border-border text-primary hover:bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="bg-card/50 border border-border text-primary hover:bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="bg-card/50 border border-border text-primary hover:bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center transition duration-200">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Map Placeholder */}
            <motion.div 
              className="h-[300px] rounded-lg overflow-hidden shadow-md border border-border bg-card relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-lg">
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
  );
};

export default Contact;
