import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";
import AdminLoginModal from "./admin-login-modal";
import ServiceRequestModal from "./service-request-modal";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Home className="text-primary w-8 h-8" />
              <span className="text-xl font-bold text-gray-800">MaidCare Pro</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-primary transition duration-300"
              >
                Contact
              </button>
              <Button
                onClick={() => setIsAdminModalOpen(true)}
                className="bg-primary hover:bg-primary/90"
              >
                Admin Login
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('about')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Services
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Contact
                </button>
                <button
                  onClick={() => {
                    setIsAdminModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-primary hover:bg-gray-100 rounded"
                >
                  Admin Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <AdminLoginModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setIsAdminModalOpen(false)} 
      />
      
      <ServiceRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  );
}
