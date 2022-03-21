const { white, green } = require("chalk");
const mongoose = require('mongoose');
const { MONGO_URI } = require('../settings/config.js');

module.exports = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(white('[') + green('INFO') + white('] ') + green('Database ') + white('Events') + green(' Loaded!'));
    } catch (error) {
        console.log(error);
    }
} 