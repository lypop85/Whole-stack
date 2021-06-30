const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    image: String,
    url: String
})

module.exports = mongoose.model('Abs', schema)