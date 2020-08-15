const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    steps: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model('recipes', recipeSchema);