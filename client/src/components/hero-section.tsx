import { Button } from "@/components/ui/button";
import ServiceRequestModal from "./service-request-modal";
import { useState } from "react";

export default function HeroSection() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="hero-bg pt-16 pb-20">
        <div className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Professional Home <span className="text-primary">Maid Services</span> in Garissa
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Connect with trusted, verified domestic helpers for all your household needs. 
                Quality service, reliable professionals, competitive rates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsRequestModalOpen(true)}
                  className="bg-primary text-white px-8 py-4 text-lg font-semibold hover:bg-primary/90 transform hover:scale-105 transition duration-300 shadow-lg"
                  size="lg"
                >
                  Request a Maid
                </Button>
                <Button
                  onClick={scrollToAbout}
                  variant="outline"
                  className="border-2 border-primary text-primary px-8 py-4 text-lg font-semibold hover:bg-primary hover:text-white transition duration-300"
                  size="lg"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="fade-in">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Professional maid service cleaning modern home" 
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <ServiceRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />
    </>
  );
}
