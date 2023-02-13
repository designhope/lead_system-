import express , {Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ClientDTO } from './types'
import bcrypt from 'bcrypt'



export default class ClientController  {
  public async createClient(req: Request, res : Response ) {
    const {email, password} : ClientDTO = req.body
    const encryptedPass = bcrypt.hashSync(password, 10)
     try {
      const client = await prisma.client.create({  
        data : {
          email,
          password : encryptedPass
        }
      })
      res.status(200).json(client)
    } catch (error) {
      res.status(400).json(error)
    } finally {
      prisma.$disconnect()
    }
  }
}