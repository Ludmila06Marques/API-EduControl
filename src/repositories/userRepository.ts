
import * as userSchema from "../type/userType.js";
import { client } from "../dbStrategy/db.js";
import * as userQueries from '../queries/users/users.queries.js';  
import * as tdmQueries from '../queries/tdm.queries.js';  

export async function findUserByEmail(email: string) {
  try {
    const result = await client.query(userQueries.findUserByEmailQueryRol, [email]);
    
    if (result.rows.length > 0) {
      return result.rows[0];  
    } else {
      return null;  
    }
  } catch (error) {
    throw error;  
  }
}

export async function findById(id: number) {
  try {
    const result = await client.query(userQueries.findUserByIdQuery, [id]);
    
    if (result.rows.length > 0) {
      return result.rows[0];  
    } else {
      return null;  
    }
  } catch (error) {
    throw error;  
  }
}
export async function updatePassword(id: number, newPassword:string) {
  try {
    const result = await client.query(userQueries.updatePassword, [newPassword,id]);
    
    if (result.rows.length > 0) {
      return result.rows[0];  
    } else {
      return null;  
    }
  } catch (error) {
    throw error;  
  }
}

export async function insertUser(user: userSchema.CreateUserType) {
  try {
    let multimediaId = null;
    if (user.photo) {
      const multimediaValues = [
        user.photo, 
        user.photoType, 
        "PERFIL"
      ];
      try{
       const multimediaResult = await client.query(tdmQueries.insertIntoMultimedia, multimediaValues);
      multimediaId = multimediaResult.rows[0].id_multimedia; 
      }catch(error){
  
        throw error
      }
   
    }

    // Prepare os valores do usuário, incluindo o multimedia_id
    const values = [
      user.name,
      user.middleName,
      user.lastName,
      user.phone || null,
      user.email,
      multimediaId || null, // Se tiver multimedia, insira o ID, caso contrário, NULL
      user.rolId,
      user.nfcCode || null,
      user.schoolId || null,
      user.stateId || null,
      user.password,
    ];
   

    // Inserir o usuário na tabela usuario
    await client.query(userQueries.createUser, values);
  } catch (error) {
    throw error
  } 
}



export async function deleteUser(id: number) {
  return null
}
export async function toUpdate(id: number, mode: string) {
  return null
}

export async function toUpdateInfo(id: number, body: any) {
  return null
}
export async function toUpdateName(id: number, name: string) {
  return null
}
export async function toUpdatePhoto(id: number, urlImage: string) {
  return null
}
export async function toUpdateCountry(id: number, country: string) {
  return null
}
