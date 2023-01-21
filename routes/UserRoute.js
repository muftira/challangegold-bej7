const express = require('express');
const router = express.Router();
const {getUser, getUserbyId, addUser, updateUser, deleteUser, loginUser} = require('../controler/UserControler')
const midleware = require("../midlewares/authentication")

router.get('/v1/user', midleware.authentication, getUser)
router.get('/v1/user/:id', midleware.authentication, getUserbyId)

// register user
router.post('/v1/userregister', addUser)

//login user
router.post('/v1/userlogin', loginUser)

router.put('/v1/user/:id', midleware.authentication, updateUser)
router.delete('/v1/user/:id', midleware.authentication, deleteUser)


module.exports = router
