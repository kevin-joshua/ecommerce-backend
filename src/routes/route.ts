import express from "express";
import {
  createUser,
  updateUser,
  getUser,
} from "../controllers/user.controller";

import {
  createProduct,
  updateProduct,
  getProduct,
  getTotalStock,
} from "../controllers/product.controller";

import {
  createOrder,
  updateOrder,
  getOrders,
  getRecentOrders,
  getOrdersByUser,
  getUsersByProduct,
} from "../controllers/order.controller";

const router = express.Router();

// User Routes
router.post("/users", createUser);        
router.put("/users/:id", updateUser);   
router.get("/users/:id", getUser);   

// Product Routes
router.post("/products", createProduct);       
router.put("/products/:id", updateProduct);     
router.get("/products/:id", getProduct);     
router.get("/products/stock/total", getTotalStock); 

// Order Routes
router.post("/orders", createOrder);                   
router.put("/orders/:id", updateOrder);               
router.get("/orders/:id", getOrdersByUser);                   
router.get("/orders/recent", getRecentOrders);       
router.get("/orders/user/:userId", getOrders);    
router.get("/orders/product/:productId/users", getUsersByProduct); 

export default router;
