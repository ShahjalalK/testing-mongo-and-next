import mongoDbConnect from '../../../helper/mongoDbConnect'
import todoModel from '../../../model/todoModel';
mongoDbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            await getTodo (req, res)
            break;

              
    }
    
  }


  const getTodo = async (req, res) => {
    try{        
      
        
            const data = await todoModel.find().populate('user')
            res.status(200).json(data)
        
        
    }
    catch(error){
        console.log(error)
        console.log('get error')
        process.exit(1)
    }
  }


 

