import express, { Request, Response } from 'express'
import { prisma } from '../config/prisma'
import { LeadDto } from './types'


export default class LeadController  {

    public async getAllClientLeads(req : Request , res: Response) : Promise<void> {
      const {id} = req.headers
      try {
        const leads = await prisma.client.findUnique({
          where : {
            id : `${id}`
          }, 
          select: {
            leads : true,
          },
        })
        res.json(leads)
      } catch (error) {
        res.status(400).json(error)
      } finally {
        prisma.$disconnect()
      }
  
    }

    public async getAllLeads(_req : Request, res : Response) : Promise<void> {
      try {
        const leads = await prisma.lead.findMany()
        res.status(200).json(leads)
      } catch (error) {
        res.status(400).json(error)
      } finally {
        prisma.$disconnect()
      }
    }

    public async createLead(req : Request, res : Response): Promise<void> {
      const { client_id } = req.headers
      const {email, name , phone, accept_news} : LeadDto = req.body
      try {
        const newLead = await prisma.lead.create({
          data : {
            email,
            name,
            phone,
            accept_news,
            client_id : `${client_id}`
        }})
        res.status(200).json(newLead)
      } catch (error) {
        res.status(400).json(error)
      } finally {
        prisma.$disconnect()
      }
    }

    public async editLead(req : Request, res : Response): Promise<void> {
      const {email, name , phone, accept_news} : LeadDto = req.body
        const {id} = req.params
        try {
          const lead = await prisma.lead.update({
            where : {
              id
            },
            data : {
              email,
              name,
              phone,
              accept_news
           }
          })
          res.status(204).json(lead)
        } catch (error) {
          res.status(400).json(error)
        } finally {
          prisma.$disconnect()
        } 
    }

    public async deleteLead(req : Request, res : Response): Promise<void> {
      const {id} = req.params
      try {
        const lead = await prisma.lead.delete({
          where : {
           id
          }
        })
        res.status(204).json(lead)
      } catch (error) {
        res.status(400).json(error)
      } finally {
        prisma.$disconnect()
      }

    } 
}