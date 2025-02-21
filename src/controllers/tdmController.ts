import { Request,Response } from "express"
import * as tdmService from "../services/tdmService.js"

export async function getAllRol(req:Request ,res:Response){

    const result = await tdmService.getAllRol()
    res.send(result).status(200)//sucess
}
