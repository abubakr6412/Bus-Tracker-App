const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    pid: {
        required: true,
        type: String
    },
    seq: {
        required:false,
        type: String
    },

    lat: {
        required:false,
        type: String
    },
    lon: {
        required:false,
        type: String
    },
   
    typ: {
        required:false,
        type: String
    },
    stpid: {
        required: false,
        type: String
    },
    stpnm: {
        required: false,
        type: String
    },
    pdist: {
        required: false,
        type: String
    },
})

module.exports = mongoose.model('patterns_2', dataSchema)