//src/routes/auth.routes.ts
import express from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { getMe, publicRoute } from "../controllers/auth.controller"

const router = express.Router()

router.get("/public", publicRoute)

router.get("/me", authMiddleware, getMe)

export default router