const express=require('express')
const router=express.Router()
const {authorizedPermission,authenticationMiddleware}=require('../middleware/authentication')

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,updatePassword



} =require('../controllers/userController')

router.get('/getallusers',authenticationMiddleware,authorizedPermission,getAllUsers)
router.get('/getsingleuser',authenticationMiddleware,getSingleUser)
router.get('/getcurrentuser',getCurrentUser)
router.post('/updateuser',authenticationMiddleware,updateUser)
router.post('/updatepassword',updatePassword)

module.exports=router