const express=require('express')
const router=express.Router()

const{

    getAllUsers,getSingleUser,getCurrentUser,updateUser,updatePassword



} =require('../controllers/userController')

router.get('/getallusers',getAllUsers)
router.get('/:id/getsingleuser',getSingleUser)
router.get('/:id/getsingleuser',getCurrentUser)
router.get('/:id/getsingleuser',updateUser)
router.get('/:id/getsingleuser',updatePassword)

module.exports=router