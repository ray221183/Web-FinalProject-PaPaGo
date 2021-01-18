const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GreatSchema = new Schema({
    uuid: {
        type: String,
        required: [true, "uuid field is required."]
    },
    account: {
        type: String,
        required: [true, "user field is required."]
    }
})

// Creating a table within database with the defined schema
const Great = mongoose.model('great', GreatSchema)

// Exporting table for querying and mutating
module.exports = Great