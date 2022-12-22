const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    rt: {
        required: true,
        type: String
    },
   dir1: {
        required: true,
        type: String
    },
    dir2: {
        required:true,
        type: String
    },
  
})

module.exports = mongoose.model('directions', dataSchema)