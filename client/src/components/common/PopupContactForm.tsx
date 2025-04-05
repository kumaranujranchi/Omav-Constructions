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
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email' }).optional().or(z.literal('')),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }).max(500, { message: 'Message must not exceed 500 characters' }),
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
      message: '',
    },
  });
  
  // Handle form submission
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest('POST', '/api/contact', data);
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
        className="relative w-full max-w-md bg-card rounded-lg shadow-lg p-6 border border-border"
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
          <div className="space-y-4">
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
              <label htmlFor="popup-message" className="block text-sm font-medium text-foreground mb-1">Message*</label>
              <textarea
                id="popup-message"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="How can we help you?"
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