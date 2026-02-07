"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "../../../prisma/prisma"


export const updateUser = async (data: any) => {
    const {userId} = await auth()
    if(!userId){
        throw new Error("Unauthorized")
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkuserId: userId
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    
    try {
        const result = await prisma.$transaction(
            async (tx)=>{
                let  industryInsight = await tx.industryInsights.findUnique({
                    where: {
                        industry: data.industry
                    }, 
                  
                })
                if (!industryInsight){
                    industryInsight = await tx.industryInsights.create({
                        data: {
                            industry: data.industry,
                            salaryRanges:[],
                            growthRate:0,
                            demandLevel:"",
                            marketOutlook:"",
                            topSkills:[],
                            recommendedSkills:[],
                            keyTrends:[],
                            lastUpdated: new Date(),
                            nextUpdate: new Date()
                        }
                    })
                }
                const updatedUser = await tx.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    }
                })
                return {updatedUser, industryInsight}
            },
            {
                timeout: 10000
            }
        )
        return result.updatedUser
        
    } catch (error) {
        
    }


}


export async function getUserOnboardingStatus(){
    const {userId} = await auth()
    if(!userId){
        throw new Error("Unauthorized")
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkuserId: userId
        }
    })
    if(!user){
        throw new Error("User not found")
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                clerkuserId: userId
            },
            select: {
                industry: true,
            }
        })
        return {isOnBoarded: !!user?.industry}
    } catch (error) {
        console.error("Error in getUserOnboardingStatus:", error);
        return {isOnBoarded: false}
    }
}

export async function getUserProfile() {
    const { userId } = await auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                clerkuserId: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                industry: true,
                bio: true,
                experience: true,
                skills: true,
            }
        })
        return user
    } catch (error) {
        console.error("Error in getUserProfile:", error);
        return null
    }
}
