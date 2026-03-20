//src/controllers/product.controller.ts
import { Request, Response } from "express"
import { getProducts, getCategories } from "../services/product.service"


export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string

    const products = await getProducts(category)

    res.json(products)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await getCategories()
    res.json(categories)
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}