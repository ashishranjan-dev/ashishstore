const User= require('../models/userModel')

const {StatusCodes}=require('http-status-codes')

const CustomError =require('../errors')


const register =async(req,res)=>{

    const user = new User()

    user=req.body

    await user.save()


   
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