const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pageData: {
        type: [String],
        required: true
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    field: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    progress: {
        type: String,
        required: true
    },
    description: {
        type: [
            {
                textType: {
                    type: String,
                    required: true
                },
                text: {
                    type: String,
                    required: true
                }
            }
        ],
        required: true
    },    
    video: {
        type: String,
        required: false
    },
    otherLinks: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema);