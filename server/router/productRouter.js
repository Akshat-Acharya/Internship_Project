const express  = require('express')
const { createProduct, getProduct, getProductById, deleteById, updateById } = require('../controller/productController')
const isAuthenticated = require('../auth/isAuthenticate')
const productRouter = express.Router()

productRouter.post("/add", isAuthenticated, createProduct)
productRouter.get("/get",getProduct)
productRouter.get("/getById/:id",getProductById)
productRouter.delete("/delete/:id",deleteById)
productRouter.put("/update/:id",updateById)



module.exports = productRouter