"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cartcontroller_1 = require("../controllers/cartcontroller");
var router = express_1.default.Router();
router.get("/list", cartcontroller_1.cartController.getCart);
router.get("/list/:id", cartcontroller_1.cartController.getCart);
router.post("/add", cartcontroller_1.cartController.addCart);
router.delete("/delete/:id", cartcontroller_1.cartController.deleteCart);
exports.default = router;
