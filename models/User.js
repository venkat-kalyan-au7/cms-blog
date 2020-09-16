import mongoose from "mongoose"
const schema = mongoose.Schema

const userSchema= new schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
},
{timestamps:true})

module.exports =mongoose.model('user',userSchema)