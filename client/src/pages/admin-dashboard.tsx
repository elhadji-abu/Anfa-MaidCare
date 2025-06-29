import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardMetrics from "@/components/admin/dashboard-metrics";
import BookingManagement from "@/components/admin/booking-management";
import MaidManagement from "@/components/admin/maid-management";
import CategoryManagement from "@/components/admin/category-management";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout, isLoading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.username}</span>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <DashboardMetrics />

        <div className="bg-white rounded-xl shadow-lg">
          <Tabs defaultValue="requests" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="grid w-full grid-cols-3 bg-transparent">
                <TabsTrigger value="requests" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-4 px-6">
                  Booking Requests
                </TabsTrigger>
                <TabsTrigger value="maids" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-4 px-6">
                  Maid Management
                </TabsTrigger>
                <TabsTrigger value="categories" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-4 px-6">
                  Categories
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="requests" className="p-6">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="maids" className="p-6">
              <MaidManagement />
            </TabsContent>

            <TabsContent value="categories" className="p-6">
              <CategoryManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
