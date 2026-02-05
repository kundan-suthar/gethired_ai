import { currentUser } from "@clerk/nextjs/server"
import prisma from "./prisma"

export const checkUser = async ()=>{
    const user = await currentUser()

    if(!user){
        return null
    }

    try {
        const loggedInUser = await prisma.user.findUnique({
            where:{
                clerkuserId:user.id
            }
        })

        if(loggedInUser){
            return loggedInUser
        }

        const newUser = await prisma.user.create({
            data:{
                clerkuserId:user.id,
                email:user.emailAddresses[0].emailAddress,
                name:user.firstName + " " + user.lastName,
                imageUrl:user.imageUrl,
            }
        })
        return newUser
    } catch (error) {
        console.log(error)
        return null
    }
}