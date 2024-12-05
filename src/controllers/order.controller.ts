import { Request, Response } from "express";
import Order from "../models/order.model";
import Product from "../models/product.model";

export const createOrder  = async (req: Request, res: Response) => {
    try {
        const { user, product, quantity } = req.body;
        const orderDate = new Date();
        const orderedProduct = await Product.findById(product);

        if (!orderedProduct || orderedProduct.stock < quantity) {
            res.status(400).json({ error: "Insufficient stock or product not found" });
        } else {
            orderedProduct.stock -= quantity;
            await orderedProduct.save();
            res.status(200).json({ message: "Order placed successfully" });
        }
        

        

        const newOrder = await Order.create({ user, product, quantity, orderDate });
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
};

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate("user").populate("product");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
};

export const getRecentOrders = async (req: Request, res: Response) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrders = await Order.find({ orderDate: { $gte: sevenDaysAgo } }).populate("user").populate("product");
        res.status(200).json(recentOrders);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve recent orders" });
    }
};

export const getOrdersByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const userOrders = await Order.find({ user: userId }).populate("product");
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve orders for user" });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { product, quantity, orderDate } = req.body;
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { product, quantity, orderDate },
        { new: true, runValidators: true }
      ).populate("product").populate("user");
  
      if (!updatedOrder) {
        res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Failed to update the order" });
    }
  };


  export const getUsersByProduct = async (req: Request, res: Response) => {
    const { productId } = req.params;
  
    try {
      // Find all orders for the specified product and populate the user field
      const orders = await Order.find({ product: productId }).populate("user");
  
      if (!orders.length) {
        res.status(404).json({ message: "No users found for this product" });
      }
  
      // Extract unique users from the orders
      const users = orders.map((order) => order.user);
      const uniqueUsers = Array.from(new Set(users.map((user: any) => user._id.toString()))).map(
        (id) => users.find((user: any) => user._id.toString() === id)
      );
  
      res.status(200).json(uniqueUsers);
    } catch (error) {
      console.error("Error fetching users by product:", error);
      res.status(500).json({ error: "Failed to fetch users for the product" });
    }
  };