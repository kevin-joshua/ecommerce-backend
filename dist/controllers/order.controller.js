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
exports.getUsersByProduct = exports.updateOrder = exports.getOrdersByUser = exports.getRecentOrders = exports.getOrders = exports.createOrder = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, product, quantity } = req.body;
        const orderDate = new Date();
        const orderedProduct = yield product_model_1.default.findById(product);
        if (!orderedProduct || orderedProduct.stock < quantity) {
            res.status(400).json({ error: "Insufficient stock or product not found" });
        }
        else {
            orderedProduct.stock -= quantity;
            yield orderedProduct.save();
            res.status(200).json({ message: "Order placed successfully" });
        }
        const newOrder = yield order_model_1.default.create({ user, product, quantity, orderDate });
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create order" });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_model_1.default.find().populate("user").populate("product");
        res.status(200).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve orders" });
    }
});
exports.getOrders = getOrders;
const getRecentOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentOrders = yield order_model_1.default.find({ orderDate: { $gte: sevenDaysAgo } }).populate("user").populate("product");
        res.status(200).json(recentOrders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve recent orders" });
    }
});
exports.getRecentOrders = getRecentOrders;
const getOrdersByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userOrders = yield order_model_1.default.find({ user: userId }).populate("product");
        res.status(200).json(userOrders);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve orders for user" });
    }
});
exports.getOrdersByUser = getOrdersByUser;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { product, quantity, orderDate } = req.body;
    try {
        const updatedOrder = yield order_model_1.default.findByIdAndUpdate(id, { product, quantity, orderDate }, { new: true, runValidators: true }).populate("product").populate("user");
        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(updatedOrder);
    }
    catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Failed to update the order" });
    }
});
exports.updateOrder = updateOrder;
const getUsersByProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.params;
    try {
        // Find all orders for the specified product and populate the user field
        const orders = yield order_model_1.default.find({ product: productId }).populate("user");
        if (!orders.length) {
            res.status(404).json({ message: "No users found for this product" });
        }
        // Extract unique users from the orders
        const users = orders.map((order) => order.user);
        const uniqueUsers = Array.from(new Set(users.map((user) => user._id.toString()))).map((id) => users.find((user) => user._id.toString() === id));
        res.status(200).json(uniqueUsers);
    }
    catch (error) {
        console.error("Error fetching users by product:", error);
        res.status(500).json({ error: "Failed to fetch users for the product" });
    }
});
exports.getUsersByProduct = getUsersByProduct;
