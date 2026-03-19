//src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express"
import { supabase } from "../config/supabase"

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

    // 🔐 get user จาก Supabase
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" })
    }

    // 🔥 ดึง role จาก profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError) {
      return res.status(500).json({ error: "Profile not found" })
    }

    // 🔥 attach user + role
    ;(req as any).user = {
      id: user.id,
      email: user.email,
      role: profile?.role || "staff", // fallback
    }

    next()
  } catch (err) {
    return res.status(500).json({ error: "Server error" })
  }
}