import { industries } from '@/data/industries'
import { getUserOnboardingStatus } from '@/lib/actions/user'
import { redirect } from 'next/navigation'
import React from 'react'
import OnboardingForm from './_components/OnboardingForm'

const Onboarding = async () => {
    //redirect to onboarding
    const {isOnBoarded} = await getUserOnboardingStatus()
    if(isOnBoarded){
       redirect("/dashboard")
    }
  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default Onboarding