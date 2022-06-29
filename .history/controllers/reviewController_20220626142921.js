

const Review =require('../models/reviewModel')

const {StatusCodes}=require('http-status-codes')

const createReview =async(req,res)=>{



    const review = await Review.create(req.body)

    if (!review) {
        throw new CustomError.BadRequestError(
          "Operation Failed please try again later"
        );
      }



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

module.exports={
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
}