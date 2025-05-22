const mongoose = require( 'mongoose')

 const connectDb = async ()=>{
    require("dotenv").config();
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Connected to db")
    } catch (error) {
        console.log("Not connected Db")
    }
}

module.exports ={connectDb}