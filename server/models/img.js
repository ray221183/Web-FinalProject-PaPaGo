const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImgSchema = new Schema({
    uuid: {
        type: String,
        required: [true, "uuid field is required."]
    },
    image: {
        type: String,
        required: [true, "img field is required."]
    }
})

// Creating a table within database with the defined schema
const Img = mongoose.model('img', ImgSchema)

// Exporting table for querying and mutating
module.exports = Img