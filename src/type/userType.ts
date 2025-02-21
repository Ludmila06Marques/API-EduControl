import { Users } from "@prisma/client";



export type CreateUserType= Omit <Users , "id" |"createdAt" >

export type CreateUserTypeLogin= Omit <Users , "id" | "name" |"photo">