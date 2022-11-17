const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    tech: {
        type: [{
            type: mongoose.Schema.Types.ObjectID,
            ref: 'Technology'
        }],
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