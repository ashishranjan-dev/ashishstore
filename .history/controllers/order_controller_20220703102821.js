const Order =require('../models/orderModel')

const getSingleUSerAllOrders =async(req,res)=>{
    res.send('orders Route')
}
const getSingleOrder =async(req,res)=>{
    res.send('orders Route')
}
const getAllOrders =async(req,res)=>{
    res.send('orders Route')
}
const createOrder =async(req,res)=>{

    const order=Order


}
const updateOrder =async(req,res)=>{
    res.send('orders Route')
}

module.exports={
    getAllOrders,getSingleOrder,getSingleUSerAllOrders,createOrder,updateOrder

}