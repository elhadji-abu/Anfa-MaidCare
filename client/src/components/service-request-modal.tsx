import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertBookingSchema } from "@shared/schema";
import { z } from "zod";

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

const formSchema = insertBookingSchema.extend({
  categoryId: z.number().min(1, "Please select a service category"),
});

export default function ServiceRequestModal({ isOpen, onClose, defaultCategory = "" }: ServiceRequestModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    categoryId: "",
    preferredDate: "",
    preferredTime: "",
    address: "",
    requirements: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: (booking) => {
      toast({
        title: "Service request submitted successfully!",
        description: `Your booking number is ${booking.bookingNumber}. We will contact you soon.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      onClose();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    }
  });

  // Set default category when modal opens
  useEffect(() => {
    if (defaultCategory && categories.length > 0) {
      const category = categories.find((cat: any) => 
        cat.name.toLowerCase().includes(defaultCategory.toLowerCase())
      );
      if (category) {
        setFormData(prev => ({ ...prev, categoryId: category.id.toString() }));
      }
    }
  }, [defaultCategory, categories]);

  const resetForm = () => {
    setFormData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      categoryId: "",
      preferredDate: "",
      preferredTime: "",
      address: "",
      requirements: ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse({
        ...formData,
        categoryId: parseInt(formData.categoryId)
      });
      
      createBookingMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Request Maid Service
          </DialogTitle>
          <p className="text-center text-gray-600">Fill out the form below to request professional maid services</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="customerName" className="text-sm font-semibold text-gray-700">Full Name</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone" className="text-sm font-semibold text-gray-700">Phone Number</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                type="text"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="+254 7XX XXX XXX"
                required
                className="mt-2"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="customerEmail" className="text-sm font-semibold text-gray-700">Email Address</Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              className="mt-2"
            />
          </div>
          
          <div>
            <Label className="text-sm font-semibold text-gray-700">Service Category</Label>
            <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange(value, "categoryId")}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="preferredDate" className="text-sm font-semibold text-gray-700">Preferred Date</Label>
              <Input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                className="mt-2"
              />
            </div>
            <div>
              <Label className="text-sm font-semibold text-gray-700">Preferred Time</Label>
              <Select value={formData.preferredTime} onValueChange={(value) => handleSelectChange(value, "preferredTime")}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                  <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label htmlFor="address" className="text-sm font-semibold text-gray-700">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your complete address including landmarks"
              rows={3}
              required
              className="mt-2"
            />
          </div>
          
          <div>
            <Label htmlFor="requirements" className="text-sm font-semibold text-gray-700">Additional Requirements</Label>
            <Textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Any specific requirements or preferences..."
              rows={3}
              className="mt-2"
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending ? "Submitting..." : "Submit Request"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-8"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
