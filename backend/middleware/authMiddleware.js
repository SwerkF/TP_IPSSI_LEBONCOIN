const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('authorization').split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        req.user = user;
        
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}