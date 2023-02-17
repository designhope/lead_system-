import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { ClientDTO } from "./types";
import bcrypt from 'bcrypt';


export default class LoginController {
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password }: ClientDTO = req.body;
    const login = await prisma.client.findUnique({
      where: {
        email
      }
    });
    if (!login) {
      res.status(404).json({ message: 'Usúario náo encontrado' });
    }
    if (login) {
      bcrypt.compare(password, login.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ message: 'Usúario e ou senha incorretos' });
          }
          res.status(200).json({
            id: login?.id,
            email: login?.email,
            message: 'connected'
          });
        })
        .catch(error => res.status(500).json({ error }));
    }
  }
}