import express from 'express';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB()




app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)






const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))