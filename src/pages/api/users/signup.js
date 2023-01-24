import mongoose from "mongoose";
import mongoDbConnect from "../../../../helper/mongoDbConnect";
import userModle from "../../../../model/userModle";
import bcrypt from 'bcrypt'

mongoDbConnect()

export default async (req, res) => {
    const {name, email, password} = req.body
    const user = await userModle.findOne({email})
    if(user){
        res.status(200).json({error : 'Authonticated error'})
    }else{
        if(!name || !email || !password){
            res.status(200).json({error : 'Please fill full!'})
        }else{
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new userModle({
                name,
                email,
                password : hashPassword
            })
            await newUser.save()
            res.status(200).json({message : 'Signup Sucess!'})
        } 
    }
   
    
}