import { useState } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Rocket,
  DollarSign,
  TrendingUp,
  Star,
  MoreVertical,
  Plus,
} from "lucide-react";

//todo: remove mock functionality
const myApps = [
  {
    id: "1",
    name: "Color Palette Generator",
    status: "deployed",
    deployments: 3,
    revenue: 124.50,
    uses: 498,
  },
  {
    id: "2",
    name: "QR Code Designer",
    status: "deployed",
    deployments: 1,
    revenue: 89.25,
    uses: 357,
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-dashboard-title">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's your overview
              </p>
            </div>
            <Button className="gap-2" data-testid="button-create-new-app">
              <Plus className="h-4 w-4" />
              Create New App
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Apps"
              value={myApps.length}
              icon={Rocket}
              trend={{ value: 0, isPositive: true }}
              testId="stat-total-apps"
            />
            <StatCard
              title="Total Revenue"
              value="$213.75"
              icon={DollarSign}
              trend={{ value: 12.5, isPositive: true }}
              testId="stat-total-revenue"
            />
            <StatCard
              title="Total Uses"
              value="855"
              icon={TrendingUp}
              trend={{ value: 8.3, isPositive: true }}
              testId="stat-total-uses"
            />
            <StatCard
              title="Avg Rating"
              value="4.7"
              icon={Star}
              testId="stat-avg-rating"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
              <TabsTrigger value="apps" data-testid="tab-my-apps">My Apps</TabsTrigger>
              <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Revenue Chart Placeholder */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
                <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                  <p className="text-muted-foreground">Chart would render here</p>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                      data-testid={`activity-${i}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payment received</p>
                          <p className="text-xs text-muted-foreground">
                            Color Palette Generator used
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">$0.25</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="apps" className="mt-6">
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4 font-medium">App Name</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Deployments</th>
                        <th className="text-left p-4 font-medium">Revenue</th>
                        <th className="text-left p-4 font-medium">Uses</th>
                        <th className="text-right p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myApps.map((app) => (
                        <tr key={app.id} className="border-b last:border-0 hover-elevate" data-testid={`row-app-${app.id}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
                              <span className="font-medium">{app.name}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{app.status}</Badge>
                          </td>
                          <td className="p-4">{app.deployments}</td>
                          <td className="p-4 font-medium text-primary">
                            ${app.revenue.toFixed(2)}
                          </td>
                          <td className="p-4">{app.uses}</td>
                          <td className="p-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              data-testid={`button-app-actions-${app.id}`}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Usage by App</h3>
                  <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                    <p className="text-muted-foreground">Bar chart would render here</p>
                  </div>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Revenue by App</h3>
                  <div className="h-64 flex items-center justify-center border rounded-lg bg-muted/30">
                    <p className="text-muted-foreground">Pie chart would render here</p>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
