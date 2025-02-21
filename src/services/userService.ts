import { Users} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import * as errorsSchema from "../utils/errorUtils.js"
import * as userRepository from "../repositories/userRepository.js"
import * as userSchema from "../type/userType.js"


dotenv.config()

export async function createUser(user:userSchema.CreateUserType){
    const userExist = await userRepository.findUserByEmail(user.email);
    if (userExist) {
      throw errorsSchema.failsConflict("Ya hay un usuario con este correo");
    }
    const rand = 10;
    const criptoPass = bcrypt.hashSync(user.password, rand);
    await userRepository.insertUser ({...user, password: criptoPass});
}

export async function loginUser(login: userSchema.CreateUserTypeLogin) {
  
  const user = await createToken(login);
  if(user){
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  const formatResponse={
    token , 
    user
  }
  return formatResponse
  }
  
}
export async function createToken(login: userSchema.CreateUserTypeLogin) {
  const user :any= await userRepository.findUserByEmail(login.email);
  if (!user) throw errorsSchema.failUnauth("unauthorized");

  const isPasswordValid = bcrypt.compareSync(login.password, user.contrasena);

  if (!isPasswordValid) throw errorsSchema.failUnauth("Invalid password");

  return user;
}
export async function findUserById(id: number) {
  const user = await userRepository.findById (id);
  if (!user) throw errorsSchema.failNotFound("User not found");


  return user;
}
export async function deleteUser(id:number){
  if(isNaN(id)) throw errorsSchema.failNotFound('Id must be a number')

  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")


  await userRepository.deleteUser(id)

}

export async function toUpdate( id:number , mode:string){
 
  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")

  await userRepository.toUpdate(id ,mode)

}

export async function toUpdateInfo( id:number , body:any){
 
  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")

  await userRepository.toUpdateInfo(id ,body)

}
export async function toUpdateName( id:number , name:string){
 
  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")

  await userRepository.toUpdateName(id ,name)

}
export async function toUpdatePhoto( id:number ,urlImage:string){
 
  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")

  await userRepository.toUpdatePhoto(id ,urlImage)

}
export async function toUpdateCountry( id:number , country:string){
 
  const userExist=await userRepository.findById(id)
  if(!userExist) throw errorsSchema.failNotFound("Not found user")

  await userRepository.toUpdateCountry(id ,country)

}