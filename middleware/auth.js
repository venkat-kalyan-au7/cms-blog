import jwt from "jsonwebtoken"
const {JWT_SECRET} = require('../config/dev')
import User from "../models/User"
import mongoose from "mongoose"

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({msg: ' access denied'});
    }

    try {
        const decoded = await jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded._id)
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'invalid token'});
    }
}