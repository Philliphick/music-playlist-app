const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    author: {
        type: String,
        require: true
    },
    title: {
        type: String, 
        require: true
    }, 
    favourite: {
        type: Boolean, 
        require: true
    }
})

module.exports = mongoose.model("Song", songSchema)