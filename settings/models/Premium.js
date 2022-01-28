const mongoose = require('mongoose');

const CreatePremium = mongoose.Schema({
    member: String,
    premium: Boolean,
    created: Number,
});

module.exports = mongoose.model('Premium', CreatePremium);

