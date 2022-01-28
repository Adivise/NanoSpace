const mongoose = require('mongoose');

const CreatePremiumGuild = mongoose.Schema({
    guild: String,
    premium: Boolean,
    created: Number,
});

module.exports = mongoose.model('PremiumGuild', CreatePremiumGuild);

