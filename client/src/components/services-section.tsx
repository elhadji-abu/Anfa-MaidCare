import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brush, Baby, Heart } from "lucide-react";
import ServiceRequestModal from "./service-request-modal";
import { useState } from "react";

export default function ServicesSection() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const showRequestForm = (category: string) => {
    setSelectedCategory(category);
    setIsRequestModalOpen(true);
  };

  const services = [
    {
      icon: Brush,
      title: "House Cleaning",
      description: "Professional house cleaning services including deep cleaning, regular maintenance, and specialized cleaning tasks.",
      category: "housekeeping",
      color: "primary"
    },
    {
      icon: Baby,
      title: "Babysitting",
      description: "Trusted and experienced babysitters to care for your children with love, attention, and safety as our priority.",
      category: "babysitting",
      color: "emerald"
    },
    {
      icon: Heart,
      title: "Elderly Care",
      description: "Compassionate caregivers for elderly family members, providing assistance with daily activities and companionship.",
      category: "caregiving",
      color: "amber"
    }
  ];

  return (
    <>
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional domestic services tailored to your needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const bgColor = service.color === "primary" ? "bg-primary/10" : 
                           service.color === "emerald" ? "bg-emerald-100" : "bg-amber-100";
              const iconColor = service.color === "primary" ? "text-primary" : 
                              service.color === "emerald" ? "text-emerald-600" : "text-amber-600";
              const buttonColor = service.color === "primary" ? "bg-primary hover:bg-primary/90" : 
                                service.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-amber-600 hover:bg-amber-700";
              
              return (
                <Card key={index} className="hover:shadow-xl transition duration-300 fade-in">
                  <CardContent className="p-8 text-center">
                    <div className={`${bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <Icon className={`${iconColor} w-8 h-8`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <Button
                      onClick={() => showRequestForm(service.category)}
                      className={`${buttonColor} text-white`}
                    >
                      Request Service
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)}
        defaultCategory={selectedCategory}
      />
    </>
  );
}
