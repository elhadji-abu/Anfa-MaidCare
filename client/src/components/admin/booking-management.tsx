import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Check, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function BookingManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["/api/bookings"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: maids = [] } = useQuery({
    queryKey: ["/api/maids"],
  });

  const updateBookingMutation = useMutation({
    mutationFn: async ({ id, status, assignedMaidId }: { id: number; status: string; assignedMaidId?: number }) => {
      const response = await apiRequest("PUT", `/api/bookings/${id}/status`, { status, assignedMaidId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/metrics"] });
      toast({
        title: "Booking updated successfully",
        description: "The booking status has been updated.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  });

  const handleStatusUpdate = (bookingId: number, newStatus: string, assignedMaidId?: number) => {
    updateBookingMutation.mutate({ id: bookingId, status: newStatus, assignedMaidId });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      approved: { color: "bg-green-100 text-green-800", label: "Approved" },
      assigned: { color: "bg-blue-100 text-blue-800", label: "Assigned" },
      canceled: { color: "bg-red-100 text-red-800", label: "Canceled" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c: any) => c.id === categoryId);
    return category?.name || "Unknown";
  };

  const filteredBookings = bookings.filter((booking: any) =>
    booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading bookings...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Recent Booking Requests</h3>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search by booking number or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No bookings found
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking: any) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.bookingNumber}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryName(booking.categoryId)}</TableCell>
                  <TableCell>
                    {format(new Date(booking.preferredDate), 'MMM dd, yyyy')}
                    <div className="text-sm text-gray-500">{booking.preferredTime}</div>
                  </TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleStatusUpdate(booking.id, "approved")}
                            className="bg-green-600 hover:bg-green-700"
                            disabled={updateBookingMutation.isPending}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusUpdate(booking.id, "canceled")}
                            disabled={updateBookingMutation.isPending}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {booking.status === "approved" && (
                        <Select onValueChange={(maidId) => handleStatusUpdate(booking.id, "assigned", parseInt(maidId))}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Assign Maid" />
                          </SelectTrigger>
                          <SelectContent>
                            {maids
                              .filter((maid: any) => maid.categoryId === booking.categoryId && maid.available)
                              .map((maid: any) => (
                                <SelectItem key={maid.id} value={maid.id.toString()}>
                                  {maid.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
