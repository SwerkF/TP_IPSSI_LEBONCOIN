const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb://localhost:27017/oliwer_leboncoin', {})
    console.log('Connected to database');
}
module.exports = {
    connect
};