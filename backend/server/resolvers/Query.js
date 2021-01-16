import { string } from 'yargs'

const User = require('../models/user')
const Post = require('../models/post')


const Query = {
	async user(parent, args, { db }, info) {
		let result = await User.find({"account":args.data.account, "password":args.data.password})
		if(result.length === 0) {
			return {
				first_name:"none",
				last_name:"none",
				account: "none",
				password: "none",
				valid:false
			}
		}
		else{
			return {
				first_name:result[0].first_name,
				last_name:result[0].last_name,
				account:result[0].account,
				password:result[0].password,
				valid: true
			};
				
		}
	},
	async post(parent, args, { db }, info){
		let have_sketch = args.data.get_sketch
		let have_non_sketch = args.data.get_non_sketch
		let result = []
		if(args.data.writer===""){
			if(have_sketch && have_non_sketch){
				result = await Post.find({
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}} ]
										})
			}
			else if(have_sketch && !have_non_sketch){
				result = await Post.find({"is_sketch":true,
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}}]
										})
			}
			else if(!have_sketch && have_non_sketch){
				result = await Post.find({"is_sketch":false,
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}}]
										})
			}
			else{
				result = []
			}
		}
		else{
			if(have_sketch && have_non_sketch){
				result = await Post.find({"writer":args.data.writer, 
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}} ]
										})
			}
			else if(have_sketch && !have_non_sketch){
				result = await Post.find({"writer":args.data.writer, "is_sketch":true,
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}}]
										})
			}
			else if(!have_sketch && have_non_sketch){
				result = await Post.find({"writer":args.data.writer, "is_sketch":false,
											$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword}}}]
										})
			}
			else{
				result = []
			}
		}
		if(result.length === 0){
			return {
				posts: []
			}
		}
		else{
			let record = []
			for(var i=0; i<result.length; ++i){
				record.push({
					content: result[i].content,
					writer:  result[i].writer,
					date:    result[i].date,
					tags:    result[i].tags,
					is_sketch: result[i].is_sketch,
					uuid:    result[i].uuid
				})
			}
			return {
				posts: record
			}
		}
	}

}


export { Query as default }
