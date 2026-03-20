//src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express"
import { getUserFromToken, getUserRole } from "../services/auth.service"

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ error: "No token" })
    }

    const user = await getUserFromToken(token)
    const role = await getUserRole(user.id)

    ;(req as any).user = {
      id: user.id,
      email: user.email,
      role,
    }

    next()
  } catch (err: any) {
    return res.status(401).json({ error: err.message })
  }
}