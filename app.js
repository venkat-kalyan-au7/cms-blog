import express from "express"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes"
import categoryRoutes from "./routes/categoryRoutes"
import postRoutes from "./routes/postRoutes"
import cors from "cors"
import path from "path"


 
const app = express()


app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use('/user',userRoutes)
app.use('/category', categoryRoutes)
app.use('/post',postRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
    })
}


module.exports =app

