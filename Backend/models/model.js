const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    vid: {
        required: true,
        type: String
    },
    timestamp: {
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
    hdg: {
        required:true,
        type: String
    },
    pid: {
        required: true,
        type: String
    },
    rt: {
        required:true,
        type: String
    },

    des: {
        required: true,
        type: String
    },
    pdist: {
        required:true,
        type: String
    },

    dly: {
        required: true,
        type: String
    },
    tatripid: {
        required:true,
        type: String
    },

    origtatripno: {
        required: true,
        type: String
    },
    tablockid: {
        required:true,
        type: String
    },
    zone: {
        required:false,
        type: String
    }

})

module.exports = mongoose.model('vehicles', dataSchema)