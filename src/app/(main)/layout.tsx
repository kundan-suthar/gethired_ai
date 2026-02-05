import React from 'react'
import Navbar from '@/components/Navbar'
import { getUserOnboardingStatus } from '@/lib/actions/user'

const MainLayout = async ({children}: {children: React.ReactNode}) => {
  const { isOnBoarded } = await getUserOnboardingStatus().catch(() => ({ isOnBoarded: false }))

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isOnboarded={isOnBoarded} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Get Hired AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout