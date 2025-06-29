import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle, List } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function DashboardMetrics() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["/api/dashboard/metrics"],
  });

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metricsData = [
    {
      title: "New Requests",
      value: metrics?.newRequests || 0,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Approved Bookings",
      value: metrics?.approvedBookings || 0,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Canceled Bookings",
      value: metrics?.canceledBookings || 0,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Total Categories",
      value: metrics?.totalCategories || 0,
      icon: List,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{metric.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                </div>
                <div className={`${metric.bgColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className={`${metric.color} w-6 h-6`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
