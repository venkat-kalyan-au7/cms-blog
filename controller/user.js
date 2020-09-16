import User from "../models/User"

import {validationResult} from "express-validator"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const jwtSecret= require('../config/dev').JWT_SECRET


exports.userRegistration = async (req, res) => {
    const { name, email, password} = req.body;

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }

    try {
        const user = await User.findOne({ email })
        if(user){
            return res.status(409).json({errors: [{msg: 'Email Already Exists'}]});
        }
        let salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })

        const registeredUser = await newUser.save();
        

        const payload = {
            _id: newUser._id
        }
        jwt.sign(
            payload, 
            jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                const {_id, name, email} = registeredUser;
                if(err) throw err;
                res.json({token, user: {_id, name, email}});
            }
        )

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Some Internal error'})
    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array() });
    }
    
    try {
        const user = await User.findOne({email : email})
        if(!user){
            return res.status(409).json({errors: [{msg: 'Invalid Credentials'}]})
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Invalid Credentials'}]});
        }

        const payload = {
            _id: user._id
        }
        jwt.sign(
            payload, 
            jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                const {_id, name, email} = user;
                if(err) throw err;
                res.json({token, user: {_id, name, email}});
            }
        )

    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Some Internal error'})
    }
}



exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'Some Internal Meeting'})
    }
}