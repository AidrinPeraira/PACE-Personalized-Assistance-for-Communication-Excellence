import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const db_url = process.env.DB_URL;

const connectDB = async () => {
    try{
        await mongoose.connect(db_url);
        console.log('MongoDB server connected');
    }catch(error){
        console.error("DatabaseConnectionError",error.message);
        process.exit(1);
    }
}

export default connectDB;