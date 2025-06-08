const express=require('express');
const { getData } = require('../controllers/authController');
const { userAuthanticationCheck } = require('../middleware/userAuth');
const AuthanticationRoute=express.Router();
AuthanticationRoute.get('/data',userAuthanticationCheck,getData)

module.exports={AuthanticationRoute}