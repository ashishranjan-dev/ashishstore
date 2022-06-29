const express=require('express')
const router=express.Router()
const {authorizedPermission,authenticationMiddleware}=require('../middleware/authentication')

const{

    getAllUsers,getSingleUser,getAllAccounts,updateUser,changePassword,changeRoles



} =require('../controllers/userController')

router.get('/allusers',authenticationMiddleware,authorizedPermission('admin','owner'),getAllUsers)
router.get('/singleuser',authenticationMiddleware,getSingleUser)
router.get('/allaccounts',authenticationMiddleware,authorizedPermission('admin','owner'),getAllAccounts)
router.post('/updateuser',authenticationMiddleware,updateUser)
router.post('/changepassword',authenticationMiddleware,changePassword)
router.post('/changeroles',authenticationMiddleware,authorizedPermission('admin','owner'),changeRoles)

module.exports=router