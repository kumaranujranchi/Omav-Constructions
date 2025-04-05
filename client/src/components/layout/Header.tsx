import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center">
                <img 
                  src="https://replit-objstore-d98b9def-f4fb-4fbc-badf-07e3f55b730e.replit.app/Omav_logo.png" 
                  alt="Omav Constructions Logo" 
                  className="h-12 mr-2"
                />
                <div className="flex flex-col">
                  <div className="text-primary font-heading font-bold text-2xl">OMAV</div>
                  <div className="text-secondary text-sm font-medium">CONSTRUCTIONS</div>
                </div>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <a className={`${isActive('/') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className={`${isActive('/about') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                About Us
              </a>
            </Link>
            <Link href="/services">
              <a className={`${isActive('/services') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                Services
              </a>
            </Link>
            <Link href="/projects">
              <a className={`${isActive('/projects') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                Projects
              </a>
            </Link>
            <Link href="/how-it-works">
              <a className={`${isActive('/how-it-works') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                How It Works
              </a>
            </Link>
            <Link href="/resources">
              <a className={`${isActive('/resources') ? 'text-primary' : 'text-secondary hover:text-primary'} font-medium transition duration-200`}>
                Resources
              </a>
            </Link>
            <Link href="/contact">
              <Button className="bg-accent hover:bg-amber-600 text-white">
                Get a Quote
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            className="lg:hidden text-secondary" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-3">
            <Link href="/">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                Home
              </a>
            </Link>
            <Link href="/about">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                About Us
              </a>
            </Link>
            <Link href="/services">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                Services
              </a>
            </Link>
            <Link href="/projects">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                Projects
              </a>
            </Link>
            <Link href="/how-it-works">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                How It Works
              </a>
            </Link>
            <Link href="/resources">
              <a 
                className="block py-2 px-4 text-secondary hover:bg-gray-light rounded"
                onClick={closeMobileMenu}
              >
                Resources
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className="block py-2 px-4 bg-accent text-white rounded"
                onClick={closeMobileMenu}
              >
                Get a Quote
              </a>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
