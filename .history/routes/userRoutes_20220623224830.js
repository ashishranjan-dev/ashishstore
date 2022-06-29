const express=require('express')
const router=express.Router()
const authenticationMiddleware=require('../middleware/authentication')
const authorizedPermission =require('../middleware/authentication')

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,updatePassword



} =require('../controllers/userController')

router.get('/getallusers',authenticationMiddleware,authorizedPermission,getAllUsers)
router.get('/getsingleuser',authenticationMiddleware,getSingleUser)
router.get('/getcurrentuser',getCurrentUser)
router.post('/updateuser',updateUser)
router.post('/updateuser',updatePassword)

module.exports=router