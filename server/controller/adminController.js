const { Admin } = require("../model/adminModel");

const bcrypt =require( 'bcryptjs')
const jwt = require('jsonwebtoken')
    require("dotenv").config();
  const signup = async(req,res)=>{
    try {
        const{fullName,email,password}=req.body;
        if(!fullName || !email || !password){
            return res.status(401).json({message:"All fields are required"})
        }        
        const user = await Admin.findOne({email})
        if(user){
            return res.status(401).json({message:"These email is already registered",success:false})
             }

        const hashedPassword = await bcrypt.hash(password,10)

      const newUser =   await Admin.create({fullName,email,password:hashedPassword})

        const tokenData = { userId: newUser._id}
        const token = jwt.sign(tokenData,process.env.JWT_SECRET , {expiresIn:'2d' })

        return res.status(200).cookie("token",token , { maxAge: 3* 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message:"Signup successfully",
            token,
            success:true
        })
    } catch (error) {
        console.log(error)
        return res.status(401).json({message:"internal server error",success:false})

    }
 }

  const login = async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(401).json({message:"All fields are required"})
        }

        const user = await Admin.findOne({email})
        if(!user){
            return res.status(401).json({message:"Please enter a correct email or password",success:false})

        }

        const isPasswordMatch = await bcrypt.compare(password,user.password)

        console.log(isPasswordMatch)

        if(!isPasswordMatch){
            return res.status(401).json({message:"Please enter a correct  password",success:false})

        }

        const tokenData = { userId: user._id}
        const token = jwt.sign(tokenData,process.env.JWT_SECRET, {expiresIn:'2d' })

        return res.status(200).cookie("token",token , { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message:"Login successfully",
            user,
            token,
            success:true
        })
        
    } catch (error) {
        console.log(error)
        
    }
 }



 module.exports = {signup,login}