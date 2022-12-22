const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    pid: {
        required: true,
        type: String
    },
    ln: {
        required:true,
        type: String
    },

    rtdir: {
        required: true,
        type: String
    },

   


})

module.exports = mongoose.model('patterns', dataSchema)