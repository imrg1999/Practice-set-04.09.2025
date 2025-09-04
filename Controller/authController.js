import userModel from "../Model/userModel.js";
import { hashing } from "../Validation/passwordHashing.js";
import { zodValSchema } from "../Validation/zodSchema.js";
import { ZodError } from "zod";

export const registerUser = async(req,res) => {
    try{
        const regReqFormat = await zodValSchema.parseAsync(req.body);
        const existingUser = await userModel.findOne({
            email: regReqFormat.email
        });
        if(existingUser) {
           return res.status(409).json({
                success: false,
                message: "User is already registered"
            })
        } 
        const protectPassword = await hashing(regReqFormat.password);
        const regNewUser = await userModel.create({
            ...regReqFormat,
            password: protectPassword
        });
        if(!regNewUser){
            res.status(404).json({
                success: false,
                message: "No new registration found",
                user: []
            })            
        } else {
            res.status(201).json({
                success: true,
                message: "New User Created Successfully",
                user: regNewUser
            })
        }
    }catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Invalid request",
                error: error.issues
            })
        } else {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}