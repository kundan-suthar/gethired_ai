import { getUserOnboardingStatus } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BrainCircuit, 
  MessageSquare, 
  UserCircle, 
  ArrowRight 
} from 'lucide-react'
import Link from 'next/link'

const Dashboard = async () => {
  const { isOnBoarded } = await getUserOnboardingStatus()
  if (!isOnBoarded) {
    redirect("/onboarding")
  }

  const user = await currentUser()

  const actions = [
    {
      title: "Start AI Interview Practice",
      description: "Hone your skills with industry-specific mock interviews tailored to your experience level.",
      icon: <BrainCircuit className="w-8 h-8 text-blue-500" />,
      href: "/interview",
      color: "bg-blue-50",
      borderColor: "border-blue-100",
      buttonText: "Launch Practice"
    },
    {
      title: "Open Interview Tutor",
      description: "Chat with Tambo, your AI career coach, to get real-time feedback and interview tips.",
      icon: <MessageSquare className="w-8 h-8 text-purple-500" />,
      href: "/chat",
      color: "bg-purple-50",
      borderColor: "border-purple-100",
      buttonText: "Start Chat"
    },
    {
      title: "View Profile",
      description: "Manage your professional details, industry specializations, and career background.",
      icon: <UserCircle className="w-8 h-8 text-emerald-500" />,
      href: "/profile",
      color: "bg-emerald-50",
      borderColor: "border-emerald-100",
      buttonText: "Manage Profile"
    }
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-10 py-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-lg text-muted-foreground">
          What would you like to achieve today? Your career journey continues here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <Card 
            key={index} 
            className={`group hover:shadow-xl transition-all duration-300 border-2 ${action.borderColor} hover:-translate-y-1`}
          >
            <CardHeader className="space-y-4">
              <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                {action.icon}
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold">{action.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {action.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full h-12 text-base font-semibold group-hover:gap-3 transition-all">
                <Link href={action.href}>
                  {action.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-900 border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <CardContent className="p-10 flex flex-col items-center text-center space-y-6 relative z-10">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Need a quick tip?</h2>
            <p className="text-slate-400 max-w-lg">
              Our AI is constantly learning about the latest industry trends to provide you with the most relevant interview insights.
            </p>
          </div>
          <Button variant="outline" className="text-white border-slate-700 hover:bg-slate-800 bg-transparent">
            View Career Insights
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard