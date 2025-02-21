
import * as userSchema from "../type/userType.js";
import { client } from "../dbStrategy/db.js";
import * as userQueries from '../queries/users/users.queries.js';  
import * as tdmQueries from '../queries/tdm.queries.js';  

export async function findUserByEmail(email: string) {
  try {
    const result = await client.query(userQueries.findUserByEmailQuery, [email]);
    
    if (result.rows.length > 0) {
      return result.rows[0];  
    } else {
      return null;  
    }
  } catch (error) {
    console.error('Erro ao buscar usuário pelo e-mail:', error);
    throw error;  
  }
}
export async function findById(id: number) {
  return null
}
export async function insertUser(user: userSchema.CreateUserType) {
  try {
    // Se o usuário tiver uma foto, insira na tabela multimedia
    let multimediaId = null;
    if (user.photo) {
      const multimediaValues = [
        user.photo, 
        user.photoType, 
        "PERFIL"
      ];

      // Inserir foto na tabela multimedia
      try{
       const multimediaResult = await client.query(tdmQueries.insertIntoMultimedia, multimediaValues);
      multimediaId = multimediaResult.rows[0].id_multimedia; // Recupera o ID da mídia inserida
      }catch(error){
        console.error('Erro ao inserir multimedia:', error.stack);
        throw new Error('Erro ao inserir multimedia no banco de dados');
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
    console.log(values);

    // Inserir o usuário na tabela usuario
    await client.query(userQueries.createUser, values);

    console.log('Usuário inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir usuário:', error.stack);
    throw new Error('Erro ao inserir usuário no banco de dados');
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
