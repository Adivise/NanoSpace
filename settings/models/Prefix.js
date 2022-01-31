const mongoose = require('mongoose');

const CreatePrefix = mongoose.Schema({
    guild: String,
    prefix: String,
});

module.exports = mongoose.model('Prefix', CreatePrefix);