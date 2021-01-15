const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	first_name: {
		type: String,
		required: [true, 'First name field is required.']
    },
    last_name: {
        type: String,
        required: [true, 'Last name field is required.']
    },
    account: {
        type: String,
        required: [true, 'Account field is required.']
    },
    password : {
        type: String,
        required: [true, 'Password field is required.']
    }
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
