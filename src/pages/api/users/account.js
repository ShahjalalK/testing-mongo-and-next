import mongoDbConnect from "../../../../helper/mongoDbConnect";
import userModle from "../../../../model/userModle";
import checkLogin from "./checkLogin";
import jwt from 'jsonwebtoken'
mongoDbConnect()

export default checkLogin (async (req, res) => {
//     const {authorization} = req.headers
//    const {userId} = jwt.verify(authorization, process.env.JWT_SECREET)
    const userData = await userModle.find({_id: req.userId})
    res.status(200).json(userData)
})