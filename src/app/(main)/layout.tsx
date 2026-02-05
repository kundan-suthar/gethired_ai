import React from 'react'
import Navbar from '@/components/Navbar'

const MainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
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