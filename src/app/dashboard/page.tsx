"use client"

import {
  AlertCircle,
  ArrowUpRight,
  BarChart,
  BarChart3,
  Bell,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Filter,
  Globe,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  Layers,
  List,
  Mail,
  Package,
  Percent,
  PieChart,
  PlusCircle,
  RefreshCw,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  Tag,
  TrendingDown,
  TrendingUp,
  User,
  Users,
  Zap
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { RecentCustomers } from '@/components/dashboard/recent-customers'
import { RecentSales } from '@/components/dashboard/recent-sales'
import { TopProducts } from '@/components/dashboard/top-products'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from '@/context/StoreContext'
import { dashboardService, DashboardStats } from '@/services/dashboardService'
import { Loader2 } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"

export default function DashboardPage() {
  const { storeId, isLoading: isStoreLoading } = useStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDashboardData = async () => {
    if (!storeId) {
      console.log('No storeId available, skipping dashboard data fetch');
      return;
    }
    
    try {
      console.log('Fetching dashboard data for store:', storeId);
      console.log('Auth token available:', !!localStorage.getItem('auth_token'));
      setIsLoading(true);
      const data = await dashboardService.getDashboardStats(storeId);
      console.log('Dashboard data received:', data);
      setStats(data);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    console.log('Current storeId:', storeId);
    console.log('Store loading state:', isStoreLoading);
    console.log('Auth token available:', !!localStorage.getItem('auth_token'));
    console.log('Current store ID in localStorage:', localStorage.getItem('currentStoreId'));
    fetchDashboardData();
  }, [storeId]);

  // Set up periodic refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchDashboardData();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, [storeId]);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    fetchDashboardData();
  };

  if (isStoreLoading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  // Calculate total traffic
  const totalTraffic = stats.trafficSources.reduce((sum, source) => sum + source.value, 0);

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <Sidebar variant="floating" collapsible="icon" className="border-r">
        <SidebarHeader>
          <div className="flex h-16 items-center px-4">
            <Link href="/" className="flex items-center">
            <Image
            src="/sokobylogo.png" 
            alt="Sokoby"
            width={150} 
            height={50} 
            className="h-11 w-auto"
          />
            </Link>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Dashboard">
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Orders">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Orders</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Products">
                    <Package className="h-5 w-5" />
                    <span>Products</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>All Products</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Inventory</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Collections</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Customers">
                    <Users className="h-5 w-5" />
                    <span>Customers</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Analytics">
                    <BarChart className="h-5 w-5" />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Marketing">
                    <Zap className="h-5 w-5" />
                    <span>Marketing</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Campaigns</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Discounts</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Abandoned Carts</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Sales Channels</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Online Store">
                    <Globe className="h-5 w-5" />
                    <span>Online Store</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Point of Sale">
                    <CreditCard className="h-5 w-5" />
                    <span>Point of Sale</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Social Media">
                    <Heart className="h-5 w-5" />
                    <span>Social Media</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Store Settings">
                    <Settings className="h-5 w-5" />
                    <span>Store Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Apps">
                    <Layers className="h-5 w-5" />
                    <span>Apps</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex w-full items-center justify-start gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Store Owner</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search..." className="pl-10 w-64" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={() => window.open(`/store/${storeId}`, '_blank')}
          >
            View your store
          </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  <DropdownMenuItem className="cursor-pointer p-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-blue-100 p-2">
                        <ShoppingBag className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-gray-500">Order #ORD-001 from John Smith</p>
                        <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-yellow-100 p-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Low stock alert</p>
                        <p className="text-xs text-gray-500">Premium Leather Backpack (5 remaining)</p>
                        <p className="mt-1 text-xs text-gray-400">5 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-4">
                    <div className="flex items-start">
                      <div className="mr-3 rounded-full bg-green-100 p-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Payment received</p>
                        <p className="text-xs text-gray-500">$329.99 from Order #ORD-001</p>
                        <p className="mt-1 text-xs text-gray-400">2 hours ago</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer justify-center">
                  <span className="text-sm font-medium text-blue-600">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" />
                  <span>Add Product</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Create Discount</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Add Blog Post</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Create Email Campaign</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help Center</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 bg-gray-50">
          <div className="p-4 sm:p-6 lg:p-8">
            <Tabs value="overview" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="mt-1 text-sm text-gray-500">
                    Welcome back, John! Here&apos;s what&apos;s happening with your store today.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>

                  <Select value="30d">
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select time range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 90 days</SelectItem>
                      <SelectItem value="year">This year</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </Button>

                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                      <DollarSign className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          12%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
                      <ShoppingBag className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalOrders}</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          8%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
                      <Users className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          5%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Avg. Order Value</CardTitle>
                      <BarChart3 className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingDown className="mr-1 h-3 w-3" />
                          3%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <Card className="bg-blue-50 border-blue-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Package className="h-8 w-8 text-blue-600 mb-2" />
                      <h3 className="font-medium text-blue-900">Add Product</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 border-purple-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Tag className="h-8 w-8 text-purple-600 mb-2" />
                      <h3 className="font-medium text-purple-900">Create Discount</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 border-green-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Globe className="h-8 w-8 text-green-600 mb-2" />
                      <h3 className="font-medium text-green-900">View Store</h3>
                    </CardContent>
                  </Card>
                  <Card className="bg-amber-50 border-amber-100">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                      <Mail className="h-8 w-8 text-amber-600 mb-2" />
                      <h3 className="font-medium text-amber-900">Send Campaign</h3>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>Monthly sales performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={stats.salesByMonth} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8884d8"
                              fillOpacity={1}
                              fill="url(#colorValue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Where your customers are coming from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {stats.trafficSources.map((source) => (
                          <div key={source.name} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {source.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {source.value} visits
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {((source.value / totalTraffic) * 100).toFixed(1)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest customer orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales orders={stats.recentOrders} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                      <CardDescription>Best selling products this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <TopProducts products={stats.topProducts} />
                    </CardContent>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Customers</CardTitle>
                      <CardDescription>New customers this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentCustomers customers={stats.recentCustomers} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Traffic sources and their percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {stats.trafficSources.map((source) => (
                          <div key={source.name} className="flex items-center">
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {source.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {source.value} visits
                              </p>
                            </div>
                            <div className="ml-auto font-medium">
                              {((source.value / totalTraffic) * 100).toFixed(1)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
                      <PieChart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.2%</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          0.5%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Returning Customers</CardTitle>
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">42%</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-green-100 text-green-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          3%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Cart Abandonment</CardTitle>
                      <ShoppingCart className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">68%</div>
                      <div className="mt-1 flex items-center text-xs">
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          2%
                        </Badge>
                        <span className="ml-2 text-gray-500">vs. previous period</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Sales by Category</CardTitle>
                    <CardDescription>Distribution of sales across product categories</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={stats.salesByCategory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#8884d8" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                    <CardDescription>How customers are finding your store</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stats.trafficSources.map((source) => (
                        <div key={source.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              {source.name === "Direct" && <Globe className="mr-2 h-4 w-4 text-blue-500" />}
                              {source.name === "Organic Search" && <Search className="mr-2 h-4 w-4 text-green-500" />}
                              {source.name === "Social Media" && <Heart className="mr-2 h-4 w-4 text-red-500" />}
                              {source.name === "Referral" && <ArrowUpRight className="mr-2 h-4 w-4 text-purple-500" />}
                              {source.name === "Email" && <Mail className="mr-2 h-4 w-4 text-amber-500" />}
                              <span className="text-sm font-medium">{source.name}</span>
                            </div>
                            <span className="text-sm font-medium">{source.value}%</span>
                          </div>
                          <Progress value={source.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports" className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Available Reports</h2>
                    <p className="text-sm text-gray-500">Generate and download detailed reports</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Filter Reports</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Sales Reports</DropdownMenuItem>
                        <DropdownMenuItem>Inventory Reports</DropdownMenuItem>
                        <DropdownMenuItem>Customer Reports</DropdownMenuItem>
                        <DropdownMenuItem>Marketing Reports</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center">
                          <Sliders className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>View Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Grid className="mr-2 h-4 w-4" />
                          Grid View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <List className="mr-2 h-4 w-4" />
                          List View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-blue-100 p-3">
                          <BarChart3 className="h-6 w-6 text-blue-600" />
                        </div>
                        <Badge variant="outline">Daily</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Sales Report</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Detailed breakdown of sales by product, category, and time period.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-green-100 p-3">
                          <Package className="h-6 w-6 text-green-600" />
                        </div>
                        <Badge variant="outline">Weekly</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Inventory Report</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Stock levels, low inventory alerts, and product performance.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-purple-100 p-3">
                          <Users className="h-6 w-6 text-purple-600" />
                        </div>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Customer Report</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Customer acquisition, retention, and lifetime value metrics.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-amber-100 p-3">
                          <Percent className="h-6 w-6 text-amber-600" />
                        </div>
                        <Badge variant="outline">Weekly</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Discount Report</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Performance of promotions, discounts, and coupon usage.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-red-100 p-3">
                          <ShoppingCart className="h-6 w-6 text-red-600" />
                        </div>
                        <Badge variant="outline">Daily</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Abandoned Cart Report</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Analysis of abandoned carts and recovery opportunities.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="rounded-full bg-indigo-100 p-3">
                          <Globe className="h-6 w-6 text-indigo-600" />
                        </div>
                        <Badge variant="outline">Monthly</Badge>
                      </div>
                      <h3 className="text-lg font-medium">Traffic Report</h3>
                      <p className="mt-1 text-sm text-gray-500">Website traffic, sources, and conversion metrics.</p>
                      <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" size="sm">
                          Preview
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription className="flex items-center text-blue-800">
                    <Info className="mr-2 h-4 w-4" />
                    <span>Need a custom report? Contact our support team for assistance.</span>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

