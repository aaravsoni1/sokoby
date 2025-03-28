"use client"

import {
  AlertCircle,
  ArrowUpRight,
  BarChart,
  BarChart3,
  Bell,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Eye,
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
  Truck,
  User,
  Users,
  XCircle,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  Pie,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Sample data for charts
const salesData = [
  { name: "Jan", value: 4000, orders: 120 },
  { name: "Feb", value: 3000, orders: 100 },
  { name: "Mar", value: 5000, orders: 150 },
  { name: "Apr", value: 4500, orders: 135 },
  { name: "May", value: 6000, orders: 180 },
  { name: "Jun", value: 5500, orders: 165 },
  { name: "Jul", value: 7000, orders: 210 },
  { name: "Aug", value: 8000, orders: 240 },
  { name: "Sep", value: 7500, orders: 225 },
  { name: "Oct", value: 9000, orders: 270 },
  { name: "Nov", value: 8500, orders: 255 },
  { name: "Dec", value: 10000, orders: 300 },
]

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home", value: 20 },
  { name: "Beauty", value: 15 },
  { name: "Other", value: 5 },
]

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Organic Search", value: 30 },
  { name: "Social Media", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

// Sample orders data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    date: "2023-03-15",
    total: 329.99,
    status: "completed",
    items: 3,
    email: "john.smith@example.com",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    date: "2023-03-14",
    total: 124.95,
    status: "processing",
    items: 2,
    email: "sarah.j@example.com",
    paymentMethod: "PayPal",
  },
  {
    id: "ORD-003",
    customer: "Michael Brown",
    date: "2023-03-14",
    total: 532.5,
    status: "completed",
    items: 5,
    email: "michael.b@example.com",
    paymentMethod: "Credit Card",
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-03-13",
    total: 89.99,
    status: "shipped",
    items: 1,
    email: "emily.d@example.com",
    paymentMethod: "Shop Pay",
  },
  {
    id: "ORD-005",
    customer: "Robert Wilson",
    date: "2023-03-12",
    total: 215.75,
    status: "cancelled",
    items: 3,
    email: "robert.w@example.com",
    paymentMethod: "Credit Card",
  },
]

// Sample products data
const topProducts = [
  {
    id: "PRD-001",
    name: "Premium Leather Backpack",
    price: 129.99,
    stock: 45,
    sold: 78,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-002",
    name: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    stock: 32,
    sold: 65,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-003",
    name: "Organic Cotton T-Shirt",
    price: 34.99,
    stock: 120,
    sold: 54,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PRD-004",
    name: "Smart Home Security Camera",
    price: 79.99,
    stock: 18,
    sold: 42,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Sample customers data
const recentCustomers = [
  {
    id: "CUS-001",
    name: "John Smith",
    email: "john.smith@example.com",
    orders: 5,
    spent: 529.95,
    lastOrder: "2023-03-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CUS-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    orders: 3,
    spent: 324.85,
    lastOrder: "2023-03-14",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CUS-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    orders: 8,
    spent: 932.5,
    lastOrder: "2023-03-14",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

// Status badge component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle className="mr-1 h-3.5 w-3.5" /> },
    processing: { color: "bg-blue-100 text-blue-800", icon: <RefreshCw className="mr-1 h-3.5 w-3.5" /> },
    shipped: { color: "bg-purple-100 text-purple-800", icon: <Truck className="mr-1 h-3.5 w-3.5" /> },
    cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle className="mr-1 h-3.5 w-3.5" /> },
    pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock className="mr-1 h-3.5 w-3.5" /> },
  }[status] || { color: "bg-gray-100 text-gray-800", icon: null }

  return (
    <Badge variant="outline" className={`flex items-center ${statusConfig.color}`}>
      {statusConfig.icon}
      <span className="capitalize">{status}</span>
    </Badge>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("overview")

  // Calculate summary metrics
  const totalSales = salesData.reduce((sum, item) => sum + item.value, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const totalCustomers = 892
  const averageOrderValue = (totalSales / totalOrders).toFixed(2)

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar variant="floating" collapsible="icon">
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
        <div className="flex-1 overflow-auto">
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
              <Button variant="outline" size="sm" className="hidden md:flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                View Store
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
          <main className="p-4 sm:p-6 lg:p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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

                  <Select value={timeRange} onValueChange={setTimeRange}>
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

                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
                      <DollarSign className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
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
                      <div className="text-2xl font-bold">{totalOrders.toLocaleString()}</div>
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
                      <div className="text-2xl font-bold">{totalCustomers.toLocaleString()}</div>
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
                      <div className="text-2xl font-bold">${averageOrderValue}</div>
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

                {/* Quick Actions */}
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

                {/* Charts */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Overview</CardTitle>
                      <CardDescription>Monthly sales performance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={salesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={trafficSourceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }: { name: string; percent: number }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {trafficSourceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Orders */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest customer orders</CardDescription>
                    </div>
                    <Link href="/dashboard/orders">
                      <Button variant="outline" size="sm" className="flex items-center">
                        View All
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead className="hidden md:table-cell">Date</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              {new Date(order.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>${order.total.toFixed(2)}</TableCell>
                            <TableCell>
                              <StatusBadge status={order.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Top Products and Recent Customers */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                      <CardDescription>Best selling products this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product) => (
                          <div key={product.id} className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium">{product.name}</h4>
                              <div className="mt-1 flex items-center text-xs text-gray-500">
                                <span>${product.price.toFixed(2)}</span>
                                <span className="mx-2">•</span>
                                <span>{product.sold} sold</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${(product.price * product.sold).toFixed(2)}</p>
                              <p className="mt-1 text-xs text-gray-500">{product.stock} in stock</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Link
                        href="/dashboard/products"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View all products
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Customers</CardTitle>
                      <CardDescription>New customers this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentCustomers.map((customer) => (
                          <div key={customer.id} className="flex items-center">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={customer.avatar} alt={customer.name} />
                              <AvatarFallback>
                                {customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-4 flex-1">
                              <h4 className="text-sm font-medium">{customer.name}</h4>
                              <p className="text-xs text-gray-500">{customer.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">${customer.spent.toFixed(2)}</p>
                              <p className="mt-1 text-xs text-gray-500">{customer.orders} orders</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                      <Link
                        href="/dashboard/customers"
                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View all customers
                      </Link>
                    </CardFooter>
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
                        <RechartsBarChart data={categoryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                      {trafficSourceData.map((source) => (
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

