import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from "@/hooks/use-toast";
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .regex(/^[+]?[\d\s\-\(\)]{10,15}$/, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email'),
  projectType: z.string().min(1, 'Please select a project type')
});

type FormData = z.infer<typeof formSchema>;

const Hero = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    projectType: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData & { message: string }) => {
      const response = await apiRequest('POST', '/api/hero-contact', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your quote request has been submitted. We'll contact you shortly.",
      });
      
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        name: '',
        phone: '',
        email: '',
        projectType: ''
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
      mutation.mutate({ ...formData, message: '' });
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
    <section id="home" className="relative bg-primary h-[90vh] min-h-[600px] flex items-center">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      
      {/* Background image */}
      <img 
        src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80" 
        alt="Construction workers on a building site"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Content overlay */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 text-white">
        <div className="max-w-3xl">
          <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-shadow mb-6">
            Building Your Vision with Quality and Trust
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Residential, Commercial & Institutional Construction in East & North India
          </p>
          
          {/* CTA and Form */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-4">Get a Free Quote Today</h3>
            <form ref={formRef} className="space-y-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className="w-full p-3 rounded bg-white/90 text-gray-dark" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone Number" 
                  className="w-full p-3 rounded bg-white/90 text-gray-dark" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                className="w-full p-3 rounded bg-white/90 text-gray-dark" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <select 
                name="projectType"
                className="w-full p-3 rounded bg-white/90 text-gray-dark" 
                value={formData.projectType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Project Type</option>
                <option value="Residential Construction">Residential Construction</option>
                <option value="Commercial Construction">Commercial Construction</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Architectural Design">Architectural Design</option>
                <option value="Consultancy">Consultancy</option>
              </select>
              <button 
                type="submit" 
                className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Submitting...' : 'Request Free Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
