"use client";

import {
    BarChart,
    ChevronRight,
    CreditCard,
    Globe,
    Megaphone,
    Package,
    ShoppingCart,
    Store,
    Truck,
    Users
} from "lucide-react";
import Link from "next/link";

import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Solution sections with icons and descriptions
const solutionSections = [
  {
    category: "Start",
    items: [
      { 
        icon: Store, 
        title: "Start Your Business", 
        description: "Build your brand from the ground up",
        link: "/start/business"
      },
      { 
        icon: Globe, 
        title: "Create Your Website", 
        description: "Design a stunning online presence",
        link: "/start/website"
      },
      { 
        icon: Package, 
        title: "Customize Your Store", 
        description: "Choose themes and personalize your shop",
        link: "/start/customize"
      }
    ]
  },
  {
    category: "Sell",
    items: [
      { 
        icon: ShoppingCart, 
        title: "Sell Online", 
        description: "Grow your business across multiple channels",
        link: "/sell/online"
      },
      { 
        icon: CreditCard, 
        title: "Accept Payments", 
        description: "Set up secure payment methods",
        link: "/sell/payments"
      },
      { 
        icon: Truck, 
        title: "Sell Globally", 
        description: "Expand your reach to international markets",
        link: "/sell/global"
      }
    ]
  },
  {
    category: "Market",
    items: [
      { 
        icon: Megaphone, 
        title: "Market Your Business", 
        description: "Reach and retain customers effectively",
        link: "/market/business"
      },
      { 
        icon: Users, 
        title: "Social Media Integration", 
        description: "Connect and sell across social platforms",
        link: "/market/social"
      },
      { 
        icon: BarChart, 
        title: "Gain Customer Insights", 
        description: "Understand your audience deeply",
        link: "/market/insights"
      }
    ]
  }
]

export default function SolutionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="container mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Powerful Solutions for Your Business
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sokoby provides comprehensive tools and features to help you start, sell, and grow your business across multiple channels.
          </p>
        </div>

        {solutionSections.map((section) => (
          <div key={section.category} className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              {section.category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <Card key={item.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <item.icon className="h-6 w-6 text-red-800" />
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg font-semibold mb-2">
                      {item.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {item.description}
                    </p>
                    <Link href={item.link} className="mt-4 block">
                      <Button variant="link" className="p-0 text-red-800 hover:text-red-700">
                        Learn More
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-gray-50 rounded-lg p-8 text-center space-y-6">
          <h3 className="text-3xl font-bold text-gray-900">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how Sokoby can help you build, manage, and grow your business with our comprehensive suite of tools.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-red-800 hover:bg-red-700">
              Start Free Trial
            </Button>
            <Button variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 