const express=require('express')
const router=express.Router()
const {authorizedPermission,authenticationMiddleware}=require('../middleware/authentication')

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,changePassword



} =require('../controllers/userController')

router.get('/getallusers',authenticationMiddleware,authorizedPermission,getAllUsers)
router.get('/getsingleuser',authenticationMiddleware,getSingleUser)
router.get('/getcurrentuser',getCurrentUser)
router.post('/updateuser',authenticationMiddleware,updateUser)
router.post('/changepassword',authenticationMiddleware,changePassword)

module.exports=router