import mongoDbConnect from "../../../../helper/mongoDbConnect"
import todoModel from "../../../../model/todoModel"
mongoDbConnect()
export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await todoUpdate(req, res)
            break;
            case "GET":
                await todoSingleDataGet(req, res)
                break;
                case "DELETE":
                await todoDelete(req, res)
                break;
       
    }
    
}

const  todoUpdate = async (req, res) => {
    try{
        const {title, description, status} = req.body
      if(!title || !description || !status){
        res.status(400).json({error : 'Please Full Fill'})
      }
    const {pid} = req.query
    const data = await todoModel.findByIdAndUpdate({_id:pid}, {
        $set : {
            title,
            description,
            status
        }
    })
    res.status(200).json({data})
    }
    catch(error){
        console.log(error)
        console.log('todo update error')
        process.exit(1)
    }
}

const  todoSingleDataGet = async (req, res) => {
    try{
        
    const {pid} = req.query
    const data = await todoModel.findById({_id:pid}).select({_id:0, __v:0, date: 0})
    res.status(200).json({data})
    }
    catch(error){
        console.log(error)
        console.log('todo get error')
        process.exit(1)
    }
}

const  todoDelete = async (req, res) => {
    try{
        
    const {pid} = req.query
     await todoModel.findByIdAndDelete({_id:pid})
    res.status(200).json({message : "Delete Success"})
    }
    catch(error){
        console.log(error)
        console.log('todo delete error')
        process.exit(1)
    }
}