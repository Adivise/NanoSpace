const mongoose = require('mongoose');

const CreateControl = mongoose.Schema({
    guild: String,
    enable: Boolean
});

module.exports = mongoose.model('Control', CreateControl);