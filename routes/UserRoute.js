const express = require('express');
const router = express.Router();
const {getUser, getUserbyId, addUser, updateUser, deleteUser, loginUser} = require('../controler/UserControler')

router.get('/v1/user', getUser)
router.get('/v1/user/:id', getUserbyId)

// register user
router.post('/v1/userregister', addUser)

//login user
router.post('/v1/userlogin', loginUser)

router.put('/v1/user/:id', updateUser)
router.delete('/v1/user/:id', deleteUser)


module.exports = router
