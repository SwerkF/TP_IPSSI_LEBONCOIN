const User = require('./User');
const mongoose = require('mongoose');

const annonceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;

