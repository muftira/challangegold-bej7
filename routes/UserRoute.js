const express = require('express');
const router = express.Router();
// const {getUser, getUserbyId, addUser, updateUser, deleteUser, loginUser} = require('../controler/UserControler')
const {UserController} = require('../controler/UserControler')
const userController = new UserController
const midleware = require("../midlewares/authentication")

router.get('/v1/user', midleware.authentication, userController.getUser)
router.get('/v1/user/:id', midleware.authentication, userController.getUserbyId)

// register user
router.post('/v1/userregister', userController.addUser)

//login user
router.post('/v1/userlogin', userController.loginUser)

router.put('/v1/user/:id', midleware.authentication, userController.updateUser)
router.delete('/v1/user/:id', midleware.authentication, userController.deleteUser)


module.exports = router
