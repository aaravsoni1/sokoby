"use client"

import { ArrowLeft, CheckCircle, CreditCard, XCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Header } from "@/components/Header"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Subscription {
  id: string
  merchant: string
  amount: number
  interval: string
  stripeCheckoutSessionId: string | null
  stripeSubscriptionId: string | null
  status: string
  session_url: string | null
}

export default function SubscriptionsPage() {
  const router = useRouter()
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelSuccess, setCancelSuccess] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const authToken = localStorage.getItem("auth_token")
      if (!authToken) {
        setError("Please log in to view your subscriptions")
        return
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/getAll`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch subscriptions")
      }
      
      const data = await response.json()
      setSubscriptions(data)
      
      // If there's an active subscription, make sure it's in localStorage
      const activeSubscription = data.find((sub: Subscription) => sub.status === "ACTIVE")
      if (activeSubscription) {
        localStorage.setItem("subscriptionId", activeSubscription.id)
      } else {
        // If no active subscription, remove from localStorage
        localStorage.removeItem("subscriptionId")
      }
    } catch (err) {
      console.error("Error fetching subscriptions:", err)
      setError(err instanceof Error ? err.message : "An error occurred while fetching your subscriptions")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async (subscriptionId: string) => {
    try {
      setIsCancelling(true)
      setError(null)
      
      const authToken = localStorage.getItem("auth_token")
      if (!authToken) {
        setError("Please log in to cancel your subscription")
        return
      }
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscription/${subscriptionId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to cancel subscription")
      }
      
      // Remove subscription ID from localStorage
      localStorage.removeItem("subscriptionId")
      
      // Show success message
      setCancelSuccess(true)
      
      // Refresh subscriptions list
      fetchSubscriptions()
    } catch (err) {
      console.error("Error cancelling subscription:", err)
      setError(err instanceof Error ? err.message : "An error occurred while cancelling your subscription")
    } finally {
      setIsCancelling(false)
    }
  }

  const activeSubscription = subscriptions.find(sub => sub.status === "ACTIVE")

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Subscriptions</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {cancelSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-800">Success</AlertTitle>
              <AlertDescription className="text-green-700">
                Your subscription has been cancelled successfully.
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-4 text-gray-500">Loading your subscriptions...</p>
            </div>
          ) : activeSubscription ? (
            <Card>
              <CardHeader>
                <CardTitle>Active Subscription</CardTitle>
                <CardDescription>Your current subscription details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Plan</span>
                    <span className="text-sm font-medium">${activeSubscription.amount} / {activeSubscription.interval.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">Subscription ID</span>
                    <span className="text-sm font-mono">{activeSubscription.id}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => router.push("/pricing")}>
                  View Plans
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => handleCancelSubscription(activeSubscription.id)}
                  disabled={isCancelling}
                >
                  {isCancelling ? "Cancelling..." : "Cancel Subscription"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Active Subscription</CardTitle>
                <CardDescription>You don&apos;t have any active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <CreditCard className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 text-center">
                    You don&apos;t have any active subscriptions. Subscribe to one of our plans to access premium features.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button onClick={() => router.push("/pricing")}>
                  View Plans
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {subscriptions.length > 0 && subscriptions.some(sub => sub.status !== "ACTIVE") && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Subscription History</h2>
              <div className="space-y-4">
                {subscriptions
                  .filter(sub => sub.status !== "ACTIVE")
                  .map(subscription => (
                    <Card key={subscription.id}>
                      <CardContent className="pt-6">
                        <div className="grid gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Plan</span>
                            <span className="text-sm font-medium">${subscription.amount} / {subscription.interval.toLowerCase()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {subscription.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500">Subscription ID</span>
                            <span className="text-sm font-mono">{subscription.id}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 