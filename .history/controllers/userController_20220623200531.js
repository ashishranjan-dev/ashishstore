
const { StatusCodes } = require("http-status-codes");

const getAllUsers=async(req,res)=>{
    res.status(200).send('get all user')
}