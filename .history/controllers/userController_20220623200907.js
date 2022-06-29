
const { StatusCodes } = require("http-status-codes");

const getAllUsers=async(req,res)=>{
    res.status(StatusCodes.OK).send('get all users')
}


const getSingleUser=async(req,res)=>{
    res.status(StatusCodes.OK).send('get single  user')
}


const getCurrentUser=async(req,res)=>{
    res.status(StatusCodes.OK).send('get current User')
}



const updateUser=async(req,res)=>{
    res.status(StatusCodes.OK).send('update user')
}


const updatePassword=async(req,res)=>{
    res.status(StatusCodes.OK).send('update Password')
}