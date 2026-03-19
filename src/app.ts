//src/app.ts
import express, { Request, Response } from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (req: Request, res: Response) => {
  res.send("API running 🚀")
})
app.use("/api/auth", authRoutes)

export default app