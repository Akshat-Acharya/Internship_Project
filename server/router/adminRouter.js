const express  = require('express')
const {login,signup} = require("../controller/adminController")
const adminRouter = express.Router()

adminRouter.post("/register",signup)
adminRouter.post("/login",login)



module.exports = adminRouter