import express from "express";
import dotenv from "dotenv";
import path from "path";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import ConnectDB from './config/db.js';
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import communityRoutes from './routes/communityRoutes.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config();
ConnectDB();

const app = express();

app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold));
