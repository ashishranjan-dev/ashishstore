const express=require('express');
const { route } = require('express/lib/router');
const router= express.Router()

const {
    register,login,logout
}=require('../controllers/authController');

//router.route('/register').post().get()

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)




