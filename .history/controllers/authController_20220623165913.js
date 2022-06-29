const User= require('../models/userModel')

const {StatusCodes}=require('http-status-codes')

const CustomError =require('../errors')


const register =async(req,res)=>{

    const{ email,password,name}=req.body

    const user = new User({
        name,password,email
    })

    await user.save()

    res.status(StatusCodes.OK).json({
        sucess:true,
        msg:'User Created Sucessfully',
        data:user
    })


   
}

const login =async(req,res)=>{
    res.send('login')
}

const logout=async(req,res)=>{
    res.send('logout')
}

module.exports ={
    register,login,logout
}