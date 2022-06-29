const express=require('express')
const router=express.Router()
const {authorizedPermission,authenticationMiddleware}=require('../middleware/authentication')

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,changePassword,changeRoles



} =require('../controllers/userController')

router.get('/getallusers',authenticationMiddleware,authorizedPermission('admin','owner'),getAllUsers)
router.get('/getsingleuser',authenticationMiddleware,getSingleUser)
router.get('/getcurrentuser',getCurrentUser)
router.post('/updateuser',authenticationMiddleware,updateUser)
router.post('/changepassword',authenticationMiddleware,changePassword)
router.post('/changeroles',authenticationMiddleware,authorizedPermission('admin','owner'),changeRoles)

module.exports=router