const express =require('express')

const router=express.Router()

const Review =require('../models/reviewModel')

const {StatusCodes}=require('http-status-codes')

const createReview =async(req,res)=>{
    res.status(StatusCodes.OK).json({
        sucesS:true,
    })
}
const getAllReviews =async(req,res)=>{
    res.status(StatusCodes.OK).json({
        sucesS:true,
    })
}
const getSingleReview =async(req,res)=>{
    res.status(StatusCodes.OK).json({
        sucesS:true,
    })
}
const updateReview =async(req,res)=>{
    res.status(StatusCodes.OK).json({
        sucesS:true,
    })
}
const deleteReview =async(req,res)=>{
    res.status(StatusCodes.OK).json({
        sucesS:true,
    })
}