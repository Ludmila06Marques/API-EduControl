import { client } from "../dbStrategy/db.js";
import { getAllRols } from "../queries/tdm.queries.js";

  
  export async function getAllRol() {
    try {
        // Usando a consulta importada para procurar o usuário pelo e-mail
        const result = await client.query(getAllRols);
        
        return result.rows
      } catch (error) {
        console.error('Erro ao buscar usuário pelo e-mail:', error);
        throw error;  // Lança o erro novamente para ser tratado em outro lugar
      }
  }