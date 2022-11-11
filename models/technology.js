const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    techType: {
        type: String,
        required: true
    },
    image: {
        url: {
            type: String,
            required: false
        },
        fileName: {
            type: String,
            required: true
        }
    }
})

module.exports = mongoose.model('Technology', technologySchema);