const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
function isMyFieldRequired () {
    return typeof this.myField === 'string'? true : false
}
const PostSchema = new Schema({
	content: {
		type: String,
		required: [isMyFieldRequired, 'Content field is required.']
    },
	title: {
		type: String,
		required: [isMyFieldRequired, 'title field is required.']
    },
	introduction: {
		type: String,
		required: [isMyFieldRequired, 'introduction field is required.']
    },
    tags: {
        type: [String],
        required: [true, 'Tags field is required.']
    },
    name: {
        type: String,
        required: [true, 'Name field is required.']        
    },
    date: {
        type: String,
        required: [true, 'Date field is required.']
    },
    writer : {
        type: String,
        required: [true, 'Writer field is required.']
    },
    is_sketch: {
        type: Boolean,
        required: [true, "Is_sketch is required."]
    },
    uuid: {
        type: String,
        required: [true, "uuid is required."]
    },
    related_uuid: {
        type: String,
        required: [isMyFieldRequired, "related uuid is required"]
    }
})


// Creating a table within database with the defined schema
const Post = mongoose.model('post', PostSchema)

// Exporting table for querying and mutating
module.exports = Post
