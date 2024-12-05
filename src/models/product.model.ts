import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    stock: number;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, {
    timestamps: true,
});

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
