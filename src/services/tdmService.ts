
import * as tdmRepository from "../repositories/tdmRepository.js"
import * as errorsType from "../utils/errorUtils.js"

export async function getAllRol(){
    const option= await tdmRepository.getAllRol()

    if(option.length==0)throw errorsType.failNotFound("Rol doesn't exist");

    return option
}
