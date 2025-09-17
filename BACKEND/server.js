import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import {router as productRouter} from './routes/product.routes.js';
import {router as cartRouter} from './routes/cart.routes.js';
import {router as checkoutRouter} from './routes/checkout.routes.js';
import {router as orderRouter} from './routes/order.routes.js';
import {router as uploadRouter} from './routes/upload.routes.js';
import {router as adminRouter} from './routes/admin.routes.js';
import {router as adminOrderRouter} from './routes/adminOrder.routes.js';
import {router as adminProductsRouter} from './routes/adminProducts.routes.js';

const app = express();

dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const port = process.env.PORT || 3000;

connectDB()


app.get('/', (req, res)=>{
    res.send('lumen wear')
})

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/checkout", checkoutRouter)
app.use("/api/orders", orderRouter)
app.use("/api/upload", uploadRouter)

// admin routes
app.use("/api/admin/users", adminRouter)
app.use("/api/admin/orders", adminOrderRouter)
app.use("/api/admin/products", adminProductsRouter)

app.listen(port, ()=>{
    console.log(`server running on localhost at port ${port}`);
})