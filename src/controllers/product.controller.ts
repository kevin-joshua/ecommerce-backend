import { Request, Response } from "express";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, category, price, stock } = req.body;
        const newProduct = await Product.create({ name, category, price, stock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) res.status(404).json({ error: "Product not found" });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product)  res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve product" });
    }
};
export const getTotalStock = async (req: Request, res: Response) => {
    try {
      // Aggregate the total stock quantity
      const totalStock = await Product.aggregate([
        {
          $group: {
            _id: null,
            totalStock: { $sum: "$stockQuantity" },
          },
        },
      ]);
  
      if (totalStock.length === 0) {
        res.status(200).json({ totalStock: 0 });
      }
  
      res.status(200).json({ totalStock: totalStock[0].totalStock });
    } catch (error) {
      console.error("Error calculating total stock:", error);
      res.status(500).json({ error: "Failed to calculate total stock quantity" });
    }
  };
