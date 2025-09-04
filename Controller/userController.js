import userModel from "../Model/userModel.js";
import { ZodError } from "zod";
import { hashing } from "../Validation/passwordHashing.js";
import { zodValSchema } from "../Validation/zodSchema.js";

export const showAllUser = async(req,res) => {
    try{
        const allUsers = await userModel.find();
    if(allUsers.length === 0) {
        return res.status(404).json({
            success: false,
            user: [],
            message: "No users listed"
        })
    } else {
        return res.status(200).json({
            success: true,
            user: allUsers
        })
    }
} catch(error) {
    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
}
}

export const createnewUser = async(req,res) => {
    try{
        const newReqFormat = await zodValSchema.parseAsync(req.body);
        const alreadyExisting = await userModel.findOne({
            email: newReqFormat.email
        });
        if(alreadyExisting) {
            return res.status(409).json({
                success: false,
                message: "User Already Exists"
            });
        }
        const safePassword = await hashing(newReqFormat.password);
        const newUser = await userModel.create({
            ...newReqFormat,
            password: safePassword
        });
        if(!newUser) {
           res.status(400).json({
        success: false,
        message: "No new user created"
    })
        } else {
            res.status(201).json({
        success: true,
        message: "New User has been created successfully",
        user: newUser
    })
        }
    }catch(error) {
        if(error instanceof ZodError) {
           return res.status(400).json({
        success: false,
        message: "Invalid Request",
        error: error.issues
    })
        } else{
          return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
        }
}
}