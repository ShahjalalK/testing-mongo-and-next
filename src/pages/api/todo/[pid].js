import mongoDbConnect from '../../../../helper/mongoDbConnect'
import todoModel from '../../../../model/todoModel';
mongoDbConnect()

export default async function handler(req, res) {
    switch (req.method) {
        case "DELETE":
            await deleteTodo (req, res)
            break;
            case "GET":
                await getTodo (req, res)
                break;
            case "PUT":
                await updateTodo (req, res)
                break;
    
    }
    
  }


  const deleteTodo = async (req, res) => {
    try{
        const {pid} = req.query
        await todoModel.deleteOne({_id:pid})
        res.status(200).json({message: 'Delete Success'})
    }
    catch(error){
        console.log(error)
        console.log('Delete error')
        process.exit(1)
    }
  }

  const getTodo = async (req, res) => {
    try{       
        const {pid} = req.query
        const data = await todoModel.findById({_id:pid})
        res.status(200).json(data)
    }
    catch(error){
        console.log(error)
        console.log('GET error')
        process.exit(1)
    }
  }

  const updateTodo = async (req, res) => {
    try{
      
        const {pid} = req.query
        const {title, description, status} = req.body
        
        if(!title || !description || !status){
            res.status(422).json({error: 'Please Full Fill UP!'})
        }else{
            await todoModel.findByIdAndUpdate({_id:pid}, {
                $set : {
                    title,
                    description,
                    status
                }
            })
            res.status(200).json({message: 'Update Success'})
        }
        
    }
    catch(error){
        console.log(error)
        console.log('Delete error')
        process.exit(1)
    }
  }

