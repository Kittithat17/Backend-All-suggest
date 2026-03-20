//src/routes/product.routes.ts
import { Router } from "express"
import { getAllProducts, getAllCategories } from "../controllers/product.controller"

const router = Router()

router.get("/", getAllProducts)
router.get("/categories", getAllCategories)

export default router