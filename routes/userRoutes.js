import express from "express"
import {userRegistration,
        userLogin,
    getUser} from "../controller/user"

import auth from "../middleware/auth"


import {check } from "express-validator"

const router = express.Router()

router.post('/register',[
    check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    check('name').not().isEmpty().withMessage('Name is Required'),
    check('password').isLength({min:6}).withMessage('6 digits is must').trim()
],userRegistration)

router.post('/login',[
    check('email').isEmail().withMessage('Invalid Email').normalizeEmail(),
    
    check('password').isLength({min:6}).withMessage('6 digits is must').trim()
],userLogin)

router.get('/me',auth,getUser)


module.exports = router