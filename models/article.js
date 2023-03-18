
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Types.ObjectId,
        refPath: 'docModel',
    },
    docModel: {
        type: String,
        required: true,
        enum: ['User', 'GoogleUser']
    }
});


module.exports = mongoose.model('Article', articleSchema);