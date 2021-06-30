const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    classifys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tittle: String,
    content: String
})

module.exports = mongoose.model('Journalism', schema)