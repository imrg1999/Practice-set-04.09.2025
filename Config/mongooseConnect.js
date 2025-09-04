import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

export const connSetup = async() => {
    try{
    const setUp = await mongoose.connect(process.env.mongoURI);
    console.log(`DB connected successfully`);
    } catch(error) {
        console.log(error.message);
        process.exit(1);
    }
    
}