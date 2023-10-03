const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')

router.get('/findAllUsers',userController.getAllUsers);

router.get('/findUser',userController.getUser);

router.post('/createUser',userController.createUser);

router.post('/login',userController.login);

router.post('/forgotPasswordUser',userController.forgotPassword);

router.patch('/updateUser', userController.updateUser)

router.delete('/deleteUser',userController.deleteUser)



module.exports=router