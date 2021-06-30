const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    icon: String
})

module.exports = mongoose.model('Descriptions', schema)