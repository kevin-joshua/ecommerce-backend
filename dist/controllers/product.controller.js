"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalStock = exports.getProduct = exports.updateProduct = exports.createProduct = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, category, price, stock } = req.body;
        const newProduct = yield product_model_1.default.create({ name, category, price, stock });
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create product" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct)
            res.status(404).json({ error: "Product not found" });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update product" });
    }
});
exports.updateProduct = updateProduct;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield product_model_1.default.findById(id);
        if (!product)
            res.status(404).json({ error: "Product not found" });
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve product" });
    }
});
exports.getProduct = getProduct;
const getTotalStock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Aggregate the total stock quantity
        const totalStock = yield product_model_1.default.aggregate([
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
    }
    catch (error) {
        console.error("Error calculating total stock:", error);
        res.status(500).json({ error: "Failed to calculate total stock quantity" });
    }
});
exports.getTotalStock = getTotalStock;
