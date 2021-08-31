import express from "express"
import { productController } from "../controllers/productscontroller"
import { checkAdmin } from "../middleware/checkAdmin"
const router = express.Router()

router.get("/list", productController.getProducts)
router.get("/list/:id", productController.getProducts)
router.post("/add", checkAdmin, productController.addProduct)
router.put("/update/:id", checkAdmin, productController.updateProduct)
router.delete("/delete/:id", checkAdmin, productController.deleteProduct)

export default router