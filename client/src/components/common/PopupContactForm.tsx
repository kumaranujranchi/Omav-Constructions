import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  city: z.string().min(1, { message: 'Please enter your city' }),
  landSize: z.string().min(1, { message: 'Please enter land size in sq ft' }),
  landDimensionNorthFeet: z.string().min(1, { message: 'Please enter North side dimension in feet' }),
  landDimensionNorthInches: z.string(),
  landDimensionSouthFeet: z.string().min(1, { message: 'Please enter South side dimension in feet' }),
  landDimensionSouthInches: z.string(),
  landDimensionEastFeet: z.string().min(1, { message: 'Please enter East side dimension in feet' }),
  landDimensionEastInches: z.string(),
  landDimensionWestFeet: z.string().min(1, { message: 'Please enter West side dimension in feet' }),
  landDimensionWestInches: z.string(),
  landFacing: z.string().min(1, { message: 'Please select land facing direction' }),
  projectType: z.string().min(1, { message: 'Please select a project type' }),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PopupContactFormProps {
  onClose: () => void;
}

const PopupContactForm: React.FC<PopupContactFormProps> = ({ onClose }) => {
  const { toast } = useToast();
  
  // Form setup with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      message: '',
    },
  });
  
  // Handle form submission
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const responseText = await response.text();
          throw new Error('Server returned non-JSON response');
        }
        
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: 'Message Sent!',
        description: 'We will get back to you soon.',
        variant: 'default',
      });
      form.reset();
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to send your message. Please try again.',
        variant: 'destructive',
      });
      console.error('Contact form error:', error);
    },
  });
  
  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="relative w-full max-w-lg bg-card rounded-lg shadow-lg p-4 border border-border overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold text-primary mb-2">Get a Quick Quote</h3>
        <p className="text-secondary mb-6">Fill out this quick form and we'll contact you shortly!</p>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
            <div>
              <label htmlFor="popup-name" className="block text-sm font-medium text-foreground mb-1">Name*</label>
              <input
                id="popup-name"
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Name"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-phone" className="block text-sm font-medium text-foreground mb-1">Phone Number*</label>
              <input
                id="popup-phone"
                type="tel"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Phone Number"
                {...form.register('phone')}
              />
              {form.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.phone.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-email" className="block text-sm font-medium text-foreground mb-1">Email (Optional)</label>
              <input
                id="popup-email"
                type="email"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your Email"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-city" className="block text-sm font-medium text-foreground mb-1">City*</label>
              <input
                id="popup-city"
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your City"
                {...form.register('city')}
              />
              {form.formState.errors.city && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.city.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-land-size" className="block text-sm font-medium text-foreground mb-1">Land Size (in sq ft)*</label>
              <input
                id="popup-land-size"
                type="text"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Land Size"
                {...form.register('landSize')}
              />
              {form.formState.errors.landSize && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.landSize.message}</p>
              )}
            </div>
            
            {/* Land Dimensions */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Land Dimensions*</label>
              
              {/* North Side */}
              <div className="mb-3">
                <p className="text-xs text-foreground mb-1">North Side</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Feet"
                      {...form.register('landDimensionNorthFeet')}
                    />
                    <span className="text-xs">Feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Inches"
                      {...form.register('landDimensionNorthInches')}
                    />
                    <span className="text-xs">Inches</span>
                  </div>
                </div>
                {form.formState.errors.landDimensionNorthFeet && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.landDimensionNorthFeet.message}</p>
                )}
              </div>
              
              {/* South Side */}
              <div className="mb-3">
                <p className="text-xs text-foreground mb-1">South Side</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Feet"
                      {...form.register('landDimensionSouthFeet')}
                    />
                    <span className="text-xs">Feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Inches"
                      {...form.register('landDimensionSouthInches')}
                    />
                    <span className="text-xs">Inches</span>
                  </div>
                </div>
                {form.formState.errors.landDimensionSouthFeet && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.landDimensionSouthFeet.message}</p>
                )}
              </div>

              {/* East Side */}
              <div className="mb-3">
                <p className="text-xs text-foreground mb-1">East Side</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Feet"
                      {...form.register('landDimensionEastFeet')}
                    />
                    <span className="text-xs">Feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Inches"
                      {...form.register('landDimensionEastInches')}
                    />
                    <span className="text-xs">Inches</span>
                  </div>
                </div>
                {form.formState.errors.landDimensionEastFeet && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.landDimensionEastFeet.message}</p>
                )}
              </div>

              {/* West Side */}
              <div>
                <p className="text-xs text-foreground mb-1">West Side</p>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Feet"
                      {...form.register('landDimensionWestFeet')}
                    />
                    <span className="text-xs">Feet</span>
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Inches"
                      {...form.register('landDimensionWestInches')}
                    />
                    <span className="text-xs">Inches</span>
                  </div>
                </div>
                {form.formState.errors.landDimensionWestFeet && (
                  <p className="mt-1 text-sm text-red-500">{form.formState.errors.landDimensionWestFeet.message}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="popup-land-facing" className="block text-sm font-medium text-foreground mb-1">Land Facing Direction*</label>
              <select
                id="popup-land-facing"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                {...form.register('landFacing')}
              >
                <option value="">Select Direction</option>
                <option value="North">North</option>
                <option value="South">South</option>
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North-East">North-East</option>
                <option value="North-West">North-West</option>
                <option value="South-East">South-East</option>
                <option value="South-West">South-West</option>
              </select>
              {form.formState.errors.landFacing && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.landFacing.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-project-type" className="block text-sm font-medium text-foreground mb-1">Project Type*</label>
              <select
                id="popup-project-type"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                {...form.register('projectType')}
              >
                <option value="">Select Project Type</option>
                <option value="Residential Construction">Residential Construction</option>
                <option value="Commercial Construction">Commercial Construction</option>
                <option value="Architectural Design">Architectural Design</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Building Consultancy">Building Consultancy</option>
                <option value="Project Management">Project Management</option>
              </select>
              {form.formState.errors.projectType && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.projectType.message}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="popup-message" className="block text-sm font-medium text-foreground mb-1">Additional Details (Optional)</label>
              <textarea
                id="popup-message"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Any additional details about your project..."
                {...form.register('message')}
              />
              {form.formState.errors.message && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
              )}
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-light transition duration-200 disabled:opacity-70"
              >
                {mutation.isPending ? 'Sending...' : 'Get a Quote'}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Wrapper component that handles timing and visibility logic
export const PopupContactFormWrapper: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownInitial, setHasShownInitial] = useState(false);
  const [hasShownSecond, setHasShownSecond] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  
  useEffect(() => {
    // Initial popup after 10 seconds
    const initialTimer = setTimeout(() => {
      if (!hasDismissed && !hasShownInitial) {
        setShowPopup(true);
        setHasShownInitial(true);
      }
    }, 10000); // 10 seconds
    
    // Second popup after 1 minute
    const secondTimer = setTimeout(() => {
      if (!hasDismissed && hasShownInitial && !hasShownSecond) {
        setShowPopup(true);
        setHasShownSecond(true);
      }
    }, 60000); // 60 seconds
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(secondTimer);
    };
  }, [hasDismissed, hasShownInitial, hasShownSecond]);
  
  const handleClose = () => {
    setShowPopup(false);
    setHasDismissed(true);
  };
  
  return (
    <AnimatePresence>
      {showPopup && <PopupContactForm onClose={handleClose} />}
    </AnimatePresence>
  );
};

export default PopupContactFormWrapper;