import { getUserOnboardingStatus } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = async() => {
     const {isOnBoarded} = await getUserOnboardingStatus()
            if(!isOnBoarded){
                redirect("/onboarding")
            }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard