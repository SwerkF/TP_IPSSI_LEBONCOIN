const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.getUser = async (req, res) => {
    try {
        const token = req.header('authorization').split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        res.json({
            id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.registerUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, password } = req.body;

        if(!firstName || !lastName || !email || !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        const existUser = await User.findOne({
            email: email
        });

        if(existUser) {
            return res.status(400).json({msg: 'User already exists'});
        }

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: 3600});

        res.json({
            token,
            user: {
                id: newUser._id,
                userName: newUser.userName,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        const user = await User.findOne({
            email: email
        });

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
        }

        token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.editUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, email, password } = req.body;

        console.log(req.body);

        if(!firstName && !lastName && !email && !password) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        let user = req.user;

        if(email) {
            const existUser = await User.findOne({
                email: email
            });

            if(existUser && existUser._id.toString() !== user._id.toString()) {
                return res.status(400).json({msg: 'User already exists'});
            }
        }

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        let hashedPassword = null;

        if(password) {
            const salt = await bcryptjs.genSalt(10);

            hashedPassword = await bcryptjs.hash(password, salt);
        }

        user.userName = userName ? userName : user.userName;
        user.firstName = firstName ? firstName : user.firstName;
        user.lastName = lastName ? lastName : user.lastName;
        user.email = email ? email : user.email;
        user.password = hashedPassword ? hashedPassword : user.password;

        console.log(user);

        await user.save();

        res.json({
            user: {
                id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteUser = async (req, res) => {
    try {

        let user = req.user;

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        await user.deleteOne(
            {_id: user._id}
        );

        res.json({msg: 'User deleted'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}