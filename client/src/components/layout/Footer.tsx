import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6" style={{ backgroundColor: 'hsl(220, 47%, 14%)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-6">
              <div className="text-white font-heading font-bold text-2xl">OMAV</div>
              <div className="ml-2 text-gray opacity-90 font-medium">CONSTRUCTIONS</div>
            </div>
            <p className="text-gray mb-6 opacity-80">
              With 12+ years of experience, Omav Constructions is a leading construction company specializing in comprehensive infrastructure development solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <a className="text-gray hover:text-white transition duration-200">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray hover:text-white transition duration-200">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray hover:text-white transition duration-200">Services</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray hover:text-white transition duration-200">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <a className="text-gray hover:text-white transition duration-200">How It Works</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray hover:text-white transition duration-200">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/residential">
                  <a className="text-gray hover:text-white transition duration-200">Residential Construction</a>
                </Link>
              </li>
              <li>
                <Link href="/services/commercial">
                  <a className="text-gray hover:text-white transition duration-200">Commercial Construction</a>
                </Link>
              </li>
              <li>
                <Link href="/services/architectural">
                  <a className="text-gray hover:text-white transition duration-200">Architectural Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services/interior">
                  <a className="text-gray hover:text-white transition duration-200">Interior Design</a>
                </Link>
              </li>
              <li>
                <Link href="/services/consultancy">
                  <a className="text-gray hover:text-white transition duration-200">Building Consultancy</a>
                </Link>
              </li>
              <li>
                <Link href="/services/management">
                  <a className="text-gray hover:text-white transition duration-200">Project Management</a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-accent"></i>
                <span>123 Construction Avenue, Patna, Bihar, India - 800001</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-accent"></i>
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-accent"></i>
                <span>info@omavconstruction.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-clock mt-1 mr-3 text-accent"></i>
                <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-dark pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Omav Constructions. All Rights Reserved.
          </div>
          <div className="flex space-x-4 text-sm text-gray">
            <a href="#" className="hover:text-white transition duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-white transition duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition duration-200">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
