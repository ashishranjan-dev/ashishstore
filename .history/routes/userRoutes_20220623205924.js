const express=require('express')
const router=express.Router()

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,updatePassword



} =require('../controllers/userController')

router.get('/getallusers',getAllUsers)
router.get('/:id/getsingleuser',getSingleUser)
router.get('/getcurrentuser',getCurrentUser)
router.post('/updateuser',updateUser)
router.post('/updateuser',updatePassword)

module.exports=router