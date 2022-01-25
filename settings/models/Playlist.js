const mongoose = require('mongoose');

const CreatePlaylist = mongoose.Schema({
    name: String,
    tracks: Array,
    created: Number,
    owner: String,
});

module.exports = mongoose.model('Playlist', CreatePlaylist);

