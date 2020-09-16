import express from "express"
import morgan from "morgan"
import userRoutes from "./routes/userRoutes"
import categoryRoutes from "./routes/categoryRoutes"

const app = express()


app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRoutes)
app.use('/category', categoryRoutes)


module.exports =app