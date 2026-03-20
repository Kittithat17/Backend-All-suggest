//src/controllers/auth.controller.ts
import { Request, Response } from "express"

export const getMe = (req: Request, res: Response) => {
  res.json({
    user: (req as any).user,
  })
}

export const publicRoute = (req: Request, res: Response) => {
  res.json({ message: "Public route" })
}