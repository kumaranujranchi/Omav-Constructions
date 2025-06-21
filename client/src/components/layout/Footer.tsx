import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white pt-12 pb-6" style={{ backgroundColor: 'hsl(220, 47%, 14%)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <div className="flex items-center mb-6">
              <img 
                src="https://i.postimg.cc/qRpSTBFn/Omav-Logo-png.png" 
                alt="Omav Constructions Logo" 
                className="h-12 mr-2 bg-white p-1 rounded"
              />
              <div className="flex flex-col">
                <div className="text-white font-heading font-bold text-2xl">OMAV OP</div>
                <div className="text-gray opacity-90 text-sm font-medium">CONSTRUCTIONS</div>
              </div>
            </div>
            <p className="text-gray mb-6 opacity-80">
              With 12+ years of experience, Omav Constructions is a leading construction company specializing in comprehensive infrastructure development solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/omavconstructions" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/omavconstructions?igsh=MTlwaXN1eDVhY2F1Mw==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent transition duration-200">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray hover:text-white transition duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray hover:text-white transition duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray hover:text-white transition duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray hover:text-white transition duration-200">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray hover:text-white transition duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray hover:text-white transition duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-heading font-bold text-lg mb-6 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-accent">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/residential" className="text-gray hover:text-white transition duration-200">
                  Residential Construction
                </Link>
              </li>
              <li>
                <Link href="/services/commercial" className="text-gray hover:text-white transition duration-200">
                  Commercial Construction
                </Link>
              </li>
              <li>
                <Link href="/services/architectural" className="text-gray hover:text-white transition duration-200">
                  Architectural Design
                </Link>
              </li>
              <li>
                <Link href="/services/interior" className="text-gray hover:text-white transition duration-200">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link href="/services/consultancy" className="text-gray hover:text-white transition duration-200">
                  Building Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/management" className="text-gray hover:text-white transition duration-200">
                  Project Management
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
                <span>Above Pratibha Dental Clinic, Near Dream Jewel Apartment, R. K. Puram, Danapur, Patna, Bihar - 801503</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-accent"></i>
                <div className="flex flex-col">
                  <span>+91 9155174333</span>
                  <span>+91 9934978469</span>
                  <span className="mt-1 font-medium text-accent">For Sales Enquiry Call - 7808060888</span>
                </div>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-accent"></i>
                <span>omavopconstructions@gmail.com</span>
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
            <div className="text-xs mt-1">
              Designed and Maintained by <a href="https://synergybrandarchitect.in/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition duration-200">Synergy Brand Architect</a>
            </div>
          </div>
          <div className="flex space-x-4 text-sm text-gray">
            <Link href="/privacy-policy" className="hover:text-white transition duration-200">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition duration-200">Terms of Service</a>
            <a href="#" className="hover:text-white transition duration-200">Sitemap</a>
            <Link href="/admin/login" className="hover:text-white transition duration-200">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
