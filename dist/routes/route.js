"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const product_controller_1 = require("../controllers/product.controller");
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default.Router();
// User Routes
router.post("/users", user_controller_1.createUser);
router.put("/users/:id", user_controller_1.updateUser);
router.get("/users/:id", user_controller_1.getUser);
// Product Routes
router.post("/products", product_controller_1.createProduct);
router.put("/products/:id", product_controller_1.updateProduct);
router.get("/products/:id", product_controller_1.getProduct);
router.get("/products/stock/total", product_controller_1.getTotalStock);
// Order Routes
router.post("/orders", order_controller_1.createOrder);
router.put("/orders/:id", order_controller_1.updateOrder);
router.get("/orders/:id", order_controller_1.getOrdersByUser);
router.get("/orders/recent", order_controller_1.getRecentOrders);
router.get("/orders/user/:userId", order_controller_1.getOrders);
router.get("/orders/product/:productId/users", order_controller_1.getUsersByProduct);
exports.default = router;
