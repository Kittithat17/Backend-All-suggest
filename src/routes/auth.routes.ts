//src/routes/auth.routes.ts
import express from "express"
import { authMiddleware } from "../middleware/auth.middleware"

const router = express.Router()

// 🔓 public
router.get("/public", (req, res) => {
  res.json({ message: "Public route" })
})

// 🔐 protected
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: (req as any).user,
  })
})

export default router