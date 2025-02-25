import { Request , Response } from "express"
import * as userService from "../services/userService.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { CreateUserType , CreateUserTypeLogin } from "../type/userType.js";

export async function login(req: Request, res: Response) {
  try {
    const user: CreateUserTypeLogin = req.body;
    const response = await userService.loginUser(user);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message || "Error en login" });
  }
}

export async function signup(req:Request ,res:Response){
try {
  const user:CreateUserType = req.body;
  await userService.createUser(user);
  res.sendStatus(201);
} catch (error) {
  res.status(401).json({ message: error.message || "Error al hacer registro" });
}
}


export async function geById(req:Request ,res:Response){
  const id= parseInt(req.params.id)

  const result= await userService.findUserById(id)

  res.send(result).status(200)//sucess
}

export async function deleteUser(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const result= await userService.deleteUser(id)

  res.sendStatus(200)//sucess
}

export async function toUpdate(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const {mode}= req.body

  await userService.toUpdate(id ,mode)
  res.sendStatus(200)//sucess
}

export async function toUpdateInfo(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const body= req.body

  await userService.toUpdateInfo(id ,body)
  res.sendStatus(200)//sucess
}
export async function toUpdateName(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const {name}= req.body

  await userService.toUpdateName(id ,name)
  res.sendStatus(200)//sucess
}
export async function toUpdatePhoto(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const {urlImage}= req.body

  await userService.toUpdatePhoto(id ,urlImage)
  res.sendStatus(200)//sucess
}
export async function toUpdateCountry(req:Request ,res:Response){
  const id= parseInt(req.params.id)
  const {country}= req.body

  await userService.toUpdateCountry(id ,country)
  res.sendStatus(200)//sucess
}


export async function forgotPassword(req: Request, res: Response) {
  try{
    const email: string = req.body.email;
    const user = await userService.findUserByEmail(email)
  
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
  
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id_usuario }, JWT_SECRET, { expiresIn: '1h' });
      
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const resetLink = `${process.env.FRONT_URL}reset-password/${token}`;
  
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Redefinición de Contraseña",
      html: `<!DOCTYPE html>
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Redefinir Contraseña</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #3f48c3; text-align: center;">Redefinir Contraseña</h2>
          <p style="color: #333;">Haz clic en el enlace de abajo para redefinir tu contraseña:</p>
          <div style="text-align: center;">
              <a href="${resetLink}" 
                 style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #94a5cb; color: #fff; text-decoration: none; border-radius: 5px; text-align: center;">
                 Redefinir Contraseña
              </a>
          </div>
          <p style="color: #333;">Si no solicitaste la redefinición de contraseña, por favor ignora este correo electrónico.</p>
          <div style="text-align: center; margin-top: 20px;">
              <p style="color: #333; font-weight: bold;">EduControl</p>
              <img src="cid:logo" alt="EduControl Logo" style="width: 100px; height: auto;">
          </div>
      </div>
  </body>
  </html>`,
      attachments: [{
          filename: 'Logo.jpg',
          path: './src/images/Logo.jpg',
          cid: 'logo' 
      }]
    });
  
    res.json({ message: "Correo enviado correctamente!" });
  }catch(error){
    res.status(401).json({ message: error.message || "Error al enviar correo" });
  }

}

export async function resetPassword (req:Request ,res:Response){
 
  try {
     const { password } = req.body;
  
  const user = res.locals.user;
  user.password = await bcrypt.hash(password, 10);

  await userService.updatePassword(user.id_usuario,user.password );

  res.json({ message: "Contraseña redefinida correctamente" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Error al redefinir contraseña" });
  }
};
