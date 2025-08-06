const Hero = () => {
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
          
          {/* CTA Section */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-medium mb-4">Ready to Start Your Project?</h3>
            <p className="text-lg opacity-90 mb-6">
              Get a free consultation and quote for your construction needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/contact" 
                className="bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200 text-center"
              >
                Get Free Quote
              </a>
              <a 
                href="tel:+91-7808060888" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-medium py-3 px-6 rounded transition duration-200 text-center"
              >
                Call Now: +91-7808060888
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;