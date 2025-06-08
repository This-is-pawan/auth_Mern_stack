const express=require('express')
const { register, login, logout } = require('../controllers/usersController')
// const { userAuthanticationCheck } = require('../middleware/userAuth')
const userRouter=express.Router()
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.post('/logout',logout)


module.exports={userRouter}

