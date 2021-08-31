"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productscontroller_1 = require("../controllers/productscontroller");
var checkAdmin_1 = require("../middleware/checkAdmin");
var router = express_1.default.Router();
router.get("/list", productscontroller_1.productController.getProducts);
router.get("/list/:id", productscontroller_1.productController.getProducts);
router.post("/add", checkAdmin_1.checkAdmin, productscontroller_1.productController.addProduct);
router.put("/update/:id", checkAdmin_1.checkAdmin, productscontroller_1.productController.updateProduct);
router.delete("/delete/:id", checkAdmin_1.checkAdmin, productscontroller_1.productController.deleteProduct);
exports.default = router;
