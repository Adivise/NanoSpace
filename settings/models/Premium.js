const mongoose = require('mongoose');

const CreatePremium = mongoose.Schema({
    member: String,
    premium: Boolean,
});

module.exports = mongoose.model('Premium', CreatePremium);

