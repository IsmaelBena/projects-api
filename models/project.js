const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tech: {
        type: [{
            name: {
                type: String,
                required: true
            },
            imgName: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    progress: {
        type: String,
        required: true
    },
    description: {
        type: [String],
        required: true
    },    
    links: {
        type: [
            {
                linkType: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        required: false
    }
})

module.exports = mongoose.model('Project', projectSchema);