const express = require ('express')
const { connectDb } = require('./config')
const productRoute = require('./router/productRouter')
const cors = require('cors')
const adminRouter = require('./router/adminRouter')
const cookieParser = require("cookie-parser")


const app = express()
require("dotenv").config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello")
})

const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption))

app.use("/product" , productRoute)
app.use("/admin",adminRouter)

app.listen(process.env.PORT,()=>{
   connectDb()
    console.log("Server Listen ")
})