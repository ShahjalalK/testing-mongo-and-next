import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true       
    },
    status : {
        type : String,
        enum : ['active', 'inactive']
    },
    date : {
        type : Date,
        default : Date.now
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
})


// todoSchema.methods = {
//     findActive : function () {
//         return mongoose.model('Todo').find({status: 'inactive'})
//     }
// }

// todoSchema.statics = {
//     findByJs : function () {
//         return this.find({title : /no/i})
//     }
// }

// todoSchema.query = {
//     byLanguage : function (language){
//         return this.find({title : new RegExp(language, 'i')})
//     }
// }


todoSchema.query = {
    byLanguage : function (language) {
        return this.find({title : new RegExp(language, 'i')})
    }
}


export default mongoose.models.Todo ||  mongoose.model('Todo', todoSchema)