import mongoose, { Document, Schema } from "mongoose";

interface Product extends Document {
  productName: string;
  id: string;
  customerId: string;
  price: number;
}

const productSchema = new Schema<Product>({
  id: { type: String, required: true },
  productName: { type: String, required: true },
  customerId: { type: String, required: true },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model<Product>("Product", productSchema);

export default ProductModel;
