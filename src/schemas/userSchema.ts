import Joi from "joi";
import * as userSchemaType from "../type/userType.js"


export const userSchemaSignup = Joi.object<userSchemaType.CreateUserType> ({
  email: Joi.string().email().required(),
  password: Joi.string().required(), 
  name: Joi.string().required(), 
  middleName: Joi.string().required(), 
  lastName: Joi.string().required(), 
  phone: Joi.string().optional(), 
  rolId: Joi.number().optional(),  
  stateId: Joi.number().optional(), 
  photo: Joi.string().optional()  ,
  photoType: Joi.string().optional()  

});



export const userSchemaLogin = Joi.object<userSchemaType.CreateUserTypeLogin> ({
  email: Joi.string().email().required(),
  password: Joi.string().required(), 
});


