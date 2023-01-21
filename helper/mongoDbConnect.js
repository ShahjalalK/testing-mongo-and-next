import mongoose from "mongoose"

const mongoDbConnect = async () => {
    try{
       await  mongoose.connect('mongodb://localhost:27017/myApp')
        console.log('Mongo Db is Connect')
    }
    catch(error){
        console.log(error)
        console.log('Mongo Db is not Connect')
        process.exit(1)
    }
}

export default mongoDbConnect