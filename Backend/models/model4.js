const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    stpid: {
        required: true,
        type: String
    },
    stpnm: {
        required:true,
        type: String
    },

    lat: {
        required: true,
        type: String
    },
    lon: {
        required:true,
        type: String
    },


})

module.exports = mongoose.model('stops', dataSchema)