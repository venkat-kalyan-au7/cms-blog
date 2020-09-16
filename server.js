import app from "./app"
import mongoose from "mongoose"

const MONGO_URI = require('./config/dev').MONGO_URI

mongoose.connect(MONGO_URI,{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:true
}).then(()=>{
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
})

const PORT = process.env.PORT||5000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})



