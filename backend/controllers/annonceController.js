const Annonce = require('../models/Annonce');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createAnnonce = async (req, res) => {
    try {
        const { title, description, price, picture } = req.body;

        if(!title || !description || !price || !picture) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        let user = req.user;

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        const annonce = new Annonce({
            title,
            description,
            price,
            picture,
            user: user._id
        });

        await annonce.save();

        res.status(201).json({msg: 'Annonce created'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.getAnnonces = async (req, res) => {
    try {
        const annonces = await Annonce.find().populate('user', 'firstName lastName');

        res.json(annonces);

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.getAnnonce = async (req, res) => {
    try {
        const annonce = await Annonce.findById(req.params.id).populate('user', 'firstName lastName');

        if(!annonce) {
            return res.status(404).json({msg: 'Annonce not found'});
        }

        res.json(annonce);

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.createAnnonce = async (req, res) => {
    try {
        const { title, description, price, picture, category } = req.body;

        if(!title || !description || !price || !picture) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        let user = req.user;

        if(!user) {
            return res.status(400).json({msg: 'User does not exist'});
        }

        const annonce = new Annonce({
            title,
            description,
            price,
            picture,
            category,
            user: user._id
        });

        await annonce.save();

        res.status(201).json({msg: 'Annonce created'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.editAnnonce = async (req, res) => {
    try {
        const { title, description, price, picture, category } = req.body;

        console.log(req.body);

        const annonce = await Annonce.findById(req.params.id);

        if(!annonce) {
            return res.status(404).json({msg: 'Annonce not found'});
        }

        annonce.title = title ? title : annonce.title;
        annonce.description = description ? description : annonce.description;
        annonce.price = price ? price : annonce.price;
        annonce.picture = picture ? picture : annonce.picture;
        annonce.category = category ? category : annonce.category;

        await annonce.save();

        res.json({msg: 'Annonce updated'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}

exports.deleteAnnonce = async (req, res) => {
    try {
        await Annonce.findByIdAndDelete(req.params.id);

        res.json({msg: 'Annonce deleted'});

    } catch (error) {
        console.error(error);
        res.status(500).json({msg: 'Server error'});
    }
}