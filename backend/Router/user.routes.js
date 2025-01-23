const express = require('express');
const { registerUser, verifyUserViaOtp, loginUser } = require('../controller/user.controller');
const auth = require('../utils/auth');
const router = express.Router();

router.post('/register', registerUser)
router.post('/verify', verifyUserViaOtp)
router.post('/login', loginUser)
router.get('/auth', auth, (req,res)=>{
    res.json({error:false, message: 'Authenticated' })
})

module.exports = router;