import express from 'express'
import { cartController } from '../controllers/cartcontroller'

const router = express.Router()

router.get("/list", cartController.getCart)
router.get("/list/:id", cartController.getCart)
router.post("/add", cartController.addCart)
router.delete("/delete/:id", cartController.deleteCart)

export default router