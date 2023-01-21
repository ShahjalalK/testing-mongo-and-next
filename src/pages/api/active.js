import mongoDbConnect from "../../../helper/mongoDbConnect"
import todoModel from "../../../model/todoModel";

mongoDbConnect()

export default async function handler(req, res) {
  switch (req.method) {
     
      case "GET":
        await todoGet(req, res)
      break; 
    
  }
  
}


const todoGet = async(req, res) => {
  try{
    const todo = new todoModel()
   const data = await todo.findActive()   
   res.status(200).json(data)
  }
  catch(error){
    console.log(error)
    console.log('Get Error')
    process.exit(1)
  }
}