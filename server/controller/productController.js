const { Product } = require("../model/productModel");

const createProduct = async(req,res)=>{
    const {name,price,category,inStock,image} = req.body;
   try {
     if(!name || !price || !category ){

        res.send("All fields are required")
     }

     const productData = await Product.create({name,price,category,inStock})

  return res.status(200).json({message:"Product create successfully",productData, success:true})

   } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Internal Server Error"})
   }
}


const getProduct = async(req,res)=>{
    try {
        const productData = await Product.find();
        return res.status(200).json({message:" All Product get successfully",productData, success:true})

    } catch (error) {

        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}


const getProductById = async(req,res)=>{
    const id = req.params.id;
    console.log("Id=",id)
    try {
        const productData = await Product.findById(id);
        return res.status(200).json({message:"  Product getById successfully",productData, success:true})

    } catch (error) {

        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}


const updateById = async (req, res) => {
    const id = req.params.id;
    const { name, price, category, inStock, image } = req.body;

    try {
        if (!name || !price || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const productData = await Product.findByIdAndUpdate(
            id,
            { name, price, category, inStock, image },
            { new: true }
        );

        if (!productData) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Update successful",
            productData,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};





const deleteById = async (req,res)=>{
    const id = req.params.id
    try {

        const productData = await Product.findByIdAndDelete(id);
        return res.status(200).json({message:"  Product Delete   successfully",productData, success:true})

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
        
        
    }
}
module.exports = {createProduct,getProductById,getProduct,deleteById,updateById}