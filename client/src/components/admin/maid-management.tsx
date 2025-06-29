import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { User, Plus, Edit, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertMaidSchema } from "@shared/schema";
import { z } from "zod";

const formSchema = insertMaidSchema.extend({
  categoryId: z.number().min(1, "Please select a category"),
  age: z.number().min(18, "Age must be at least 18"),
  experience: z.number().min(0, "Experience cannot be negative"),
});

export default function MaidManagement() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMaid, setEditingMaid] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    categoryId: "",
    experience: "",
    phone: "",
    email: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: maids = [], isLoading } = useQuery({
    queryKey: ["/api/maids"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const createMaidMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/maids", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maids"] });
      toast({
        title: "Maid added successfully",
        description: "The maid profile has been created.",
      });
      setIsAddModalOpen(false);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Failed to add maid",
        description: "Please check the information and try again.",
        variant: "destructive",
      });
    }
  });

  const updateMaidMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/maids/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maids"] });
      toast({
        title: "Maid updated successfully",
        description: "The maid profile has been updated.",
      });
      setEditingMaid(null);
      resetForm();
    },
    onError: () => {
      toast({
        title: "Failed to update maid",
        description: "Please check the information and try again.",
        variant: "destructive",
      });
    }
  });

  const deleteMaidMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/maids/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/maids"] });
      toast({
        title: "Maid deleted successfully",
        description: "The maid profile has been deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete maid",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  });

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      categoryId: "",
      experience: "",
      phone: "",
      email: ""
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = formSchema.parse({
        ...formData,
        age: parseInt(formData.age),
        categoryId: parseInt(formData.categoryId),
        experience: parseInt(formData.experience)
      });

      if (editingMaid) {
        updateMaidMutation.mutate({ id: editingMaid.id, data: validatedData });
      } else {
        createMaidMutation.mutate(validatedData);
      }
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

  const handleEdit = (maid: any) => {
    setEditingMaid(maid);
    setFormData({
      name: maid.name,
      age: maid.age.toString(),
      categoryId: maid.categoryId.toString(),
      experience: maid.experience.toString(),
      phone: maid.phone,
      email: maid.email || ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c: any) => c.id === categoryId);
    return category?.name || "Unknown";
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading maids...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Maid Profiles</h3>
        <Dialog open={isAddModalOpen || editingMaid !== null} onOpenChange={(open) => {
          if (!open) {
            setIsAddModalOpen(false);
            setEditingMaid(null);
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Maid
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingMaid ? "Edit Maid Profile" : "Add New Maid"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label>Category</Label>
                <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
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
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email (optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  className="flex-1"
                  disabled={createMaidMutation.isPending || updateMaidMutation.isPending}
                >
                  {editingMaid ? "Update" : "Add"} Maid
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingMaid(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      {maids.length === 0 ? (
        <div className="text-center py-12">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No maids added yet. Add your first maid to get started.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {maids.map((maid: any) => (
            <Card key={maid.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-primary w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{maid.name}</h4>
                  <p className="text-gray-600 text-sm mb-1">{getCategoryName(maid.categoryId)}</p>
                  <p className="text-gray-600 text-sm mb-2">{maid.experience} years experience</p>
                  <p className="text-gray-600 text-sm mb-4">{maid.phone}</p>
                  <div className="mb-4">
                    <Badge variant={maid.available ? "default" : "secondary"}>
                      {maid.available ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(maid)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1"
                      onClick={() => deleteMaidMutation.mutate(maid.id)}
                      disabled={deleteMaidMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
