import mongoDbConnect from '../../../helper/mongoDbConnect'
import todoModel from '../../../model/todoModel';
import checkLogin from './users/checkLogin';
mongoDbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        
            case "POST":
                await postTodo (req, res)
                break;
    
    }
    
  }
  const postTodo = checkLogin (async (req, res) => {
    try{
       const {title, description, status} = req.body
       if(!title || !description || !status){
        res.status(422).json({error : 'Please Full Fill UP!'})
       }else{
        const newTodo = new todoModel({
            title,
            description,
            status,
            user : req.userId
           })
           await newTodo.save()           
           res.status(200).json({message : 'Save Success'})
       }
       
    }
    catch(error){
        console.log(error)
        console.log('post error')
        process.exit(1)
    }
  })


