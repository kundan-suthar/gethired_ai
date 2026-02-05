import { getUserOnboardingStatus } from '@/lib/actions/user'
import React from 'react'
import { redirect } from 'next/navigation'
const IndustryInsights = async() => {
     const {isOnBoarded} = await getUserOnboardingStatus()
        if(!isOnBoarded){
            redirect("/onboarding")
        }
  return (
    <div>IndustryInsights</div>
  )
}

export default IndustryInsights