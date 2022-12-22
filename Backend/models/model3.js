const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    rt: {
        required: true,
        type: String
    },
    rtnm: {
        required:true,
        type: String
    },

    rtclr: {
        required: true,
        type: String
    },
    rtdd: {
        required:true,
        type: String
    },



})

module.exports = mongoose.model('routes', dataSchema)