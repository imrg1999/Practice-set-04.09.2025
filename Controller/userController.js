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

export const updateUsers = async(req,res) => {
    try{
        const {id} = req.params;
        const updateReqFormat = await zodValSchema.parseAsync(req.body);
        if(updateReqFormat.password) {
            updateReqFormat.password = await hashing(updateReqFormat.password);
        }
        const updateInfo = await userModel.findByIdAndUpdate(id,{
            ...updateReqFormat,
        },{new:true}).select("-password");
        if(!updateInfo) {
        return res.status(404).json({
        success: false,
        message: "Data Not Found"})
        } else {
         res.status(200).json({
        success: true,
        message: "Data updated successfully",
        user: updateInfo
         })
        }
    }catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal Server Error"
    })
    }
}

export const deleteUser = async(req,res) => {
    try{
        const {id} = req.params;
        const deleteOne = await userModel.findByIdAndDelete(id);
        if(!deleteOne){
        res.status(404).json({
        success: false,
        message: "User could not be deleted"})
        } else {
         res.status(200).json({
        success: true,
        message: "User deleted successfully",
        user: deleteOne
    })
        }
    }catch (error) {
        return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message
    })
    }
}