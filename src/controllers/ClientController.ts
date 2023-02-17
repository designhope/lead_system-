import express , {Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { ClientDTO } from './types'
import bcrypt from 'bcrypt'
import { generateRandomCode } from '../helpers/generateRandomCode'



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

  public async forgetPassword(req: Request, res: Response) { 
    const {email} : ClientDTO = req.body
    try {
      const client = await prisma.client.findUnique({
        where: {
          email
        }
      })
      if (!client) {
        res.status(404).json({message: 'Usuario não encontrado'})
      }
      if (client) {
        try {
          const code = generateRandomCode()
          const clientQuery = await prisma.client.update({
            where: {
              id: client.id
            },
            select: {
              id: true,
              email: true
            },
            data: {
              codeForget: code
            }
          })
          res.status(200).json({ message: `Email com codigo ${code} para validar a conta enviado com sucesso`, clientQuery })
        } catch (error) {
          res.status(400).json(error)
        }
      }
    } catch (error) {
      res.status(400).json(error)
    } finally {
      prisma.$disconnect()
    }
  } 
}