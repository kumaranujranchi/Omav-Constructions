import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    text: "Omav delivered our dream home with exceptional quality and professionalism. The team was responsive, transparent about costs, and finished ahead of schedule. We couldn't be happier with the results.",
    author: "Rajesh Kumar",
    position: "Residential Client, Patna"
  },
  {
    text: "The consultancy services from Omav Constructions helped us optimize our commercial building design, resulting in significant cost savings without compromising on quality or aesthetics.",
    author: "Priya Singh",
    position: "Commercial Client, Delhi"
  },
  {
    text: "Choosing Omav for our school expansion project was the best decision we made. Their understanding of institutional requirements and timely execution ensured minimal disruption to our academic schedule.",
    author: "Dr. Anand Sharma",
    position: "Educational Institution, Bihar"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gray-light">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-secondary max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with Omav Constructions.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          {/* Testimonial Slider */}
          <div className="testimonial-slider relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <div className="text-accent text-4xl mb-4">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="text-secondary-dark text-lg italic mb-6">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-primary">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="ml-4">
                    <div className="font-heading font-bold text-primary">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-secondary text-sm">
                      {testimonials[currentIndex].position}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation controls */}
            <button 
              className="absolute top-1/2 -left-5 transform -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center focus:outline-none md:-left-12"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <button 
              className="absolute top-1/2 -right-5 transform -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center focus:outline-none md:-right-12"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? 'bg-accent' : 'bg-gray'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
