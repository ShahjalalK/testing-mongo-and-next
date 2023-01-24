import mongoDbConnect from "../../../../helper/mongoDbConnect";
import userModle from "../../../../model/userModle";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

mongoDbConnect()

export default async (req, res) => {
    const {email, password} = req.body
    const user = await userModle.findOne({email})
    if(!user){
        res.status(201).json({error : 'Authonticated error'})
    }else{
        if(!email || !password){
            res.status(201).json({error : 'Please fill full!'})
        }else{
           const matchPassword = await bcrypt.compare(password, user.password)
           if(matchPassword){
            const token = jwt.sign(
                {userId : user._id,
                userName : user.name}, 
                process.env.JWT_SECREET, {
                    expiresIn : "1h"
                })
            res.status(200).json({token})
           }else{
            res.status(201).json({error : 'Authonticated error'})
           }
        } 
    }
   
    
}