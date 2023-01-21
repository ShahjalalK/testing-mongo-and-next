import mongoDbConnect from "../../../helper/mongoDbConnect"
import todoModel from "../../../model/todoModel";

mongoDbConnect()

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
        await todoPost(req, res)
      break; 
      case "GET":
        await todoGet(req, res)
      break; 
    
  }
  
}


const todoPost = async(req, res) => {
    try{
      const {title, description, status} = req.body
      if(!title || !description || !status){
        res.status(400).json({error : 'Please Full Fill'})
      }
      const newTodo = new todoModel({
        title,
        description,
        status
      })
      await newTodo.save()
      res.status(200).json({message : 'New Todo Save'})

    }
    catch(error){
      console.log(error)
      console.log('Post Error')
      process.exit(1)
    }
}
const todoGet = async(req, res) => {
  try{
   const data = await todoModel.find()   
   res.status(200).json(data)
  }
  catch(error){
    console.log(error)
    console.log('Get Error')
    process.exit(1)
  }
}