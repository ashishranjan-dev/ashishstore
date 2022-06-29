const Product=require('../models/ProductModel')
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct =async (req,res)=>{

    const{ name,price,description,image,category,company,colors,inventory,user} =req.body

    if(!name || price || !description || !image || !category || !company || !colors || !inventory || !user){

        throw new CustomError.BadRequestError('Please Provide all values')

    }

    
 
}

const getAllProducts =async (req,res)=>{
    res.send('create product')
}

const getSingleProduct =async (req,res)=>{
    res.send('create product')
}

const updateProduct =async (req,res)=>{
    res.send('create product')
}

const deleteProduct =async (req,res)=>{
    res.send('create product')
}
const uploadImage =async (req,res)=>{
    res.send('create product')

}

module.exports ={
    createProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct,uploadImage

}
