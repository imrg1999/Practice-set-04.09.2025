import userModel from "../Model/userModel.js";
import { hashing } from "../Validation/passwordHashing.js";
import { zodValSchema } from "../Validation/zodSchema.js";
import { ZodError } from "zod";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

export const loginUser = async(req,res) => {
    try{
        const logInReqFormat = await zodValSchema.parseAsync(req.body);
        const checkRegStatus = await userModel.findOne({
            email: logInReqFormat.email
        })
        if(!checkRegStatus) {
            return res.status(404).json({
                success: false,
                message: "no registration found"
            })
        }
        const checkPassword = await bcrypt.compare(logInReqFormat.password,checkRegStatus.password);
        if(!checkPassword) {
             return res.status(401).json({
            success: false,
            message: "Incorrect password"
        })
        }
        const token = jwt.sign({
            email: checkRegStatus.email,
            id: checkRegStatus._id
        }, process.env.JWT_SECRET,
    {expiresIn: "1h"});
    if(token) {
        res.status(201).json({
            success: true,
            message: "Token generated successfully",
            token: token
        })
    } else{
        return res.status(404).json({
            success: false,
            message: "token wasn't generated"
        })
    }
    } catch (error) {
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

export const accessProfile = async(req,res) => {
    
}