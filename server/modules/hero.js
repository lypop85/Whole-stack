const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    icon: String,
    nickname: String,
    location: String,
    categorys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tip: {
        difficulty: Number,
        skill: Number,
        attack: Number,
        existence: Number
    },
    descriptions: [{
        icon: String,
        name: String,
        passive: String
    }],
    items1: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }],
    items2: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }],
    use: String,
    countermeasure: String,
    warfare: String,
    partners: [{
        hero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hero'
        },
        text: String
    }],
    enemys: [{
        hero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hero'
        },
        text: String
    }],
    restraints: [{
        hero: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'hero'
        },
        text: String
    }]
})

module.exports = mongoose.model('hero', schema)