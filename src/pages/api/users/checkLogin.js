import jwt from 'jsonwebtoken'
export default (iComponents) => {
    return  (req, res) => {
        const {authorization} = req.headers
        if(!authorization){
           return res.status(201).json({error : 'You must login'})
        }
        try{
            const {userId, userName} =  jwt.verify(authorization, process.env.JWT_SECREET)
            req.userId = userId
            req.userName = userName
            return iComponents(req, res)
        }
        catch(error){
          return  res.status(201).json({error : 'You must login'})
        }
    }
}