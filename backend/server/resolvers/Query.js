import { string } from 'yargs'

const User = require('../models/user')
const Post = require('../models/post')
const Great = require('../models/great')


const Query = {
	async user(parent, args, { db }, info) {
		console.log("user")
		let result = await User.find({"account":args.data.account, "password":args.data.password})
		if(result.length === 0) {
			return {
				name: "none",
				first_name:"none",
				last_name: "none",
				account: "none",
				password: "none",
				valid:false
			}
		}
		else{
			return {
				first_name:result[0].first_name,
				last_name:result[0].last_name,
				name:result[0].name,
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
		if(args.data.uuid !== "" && args.data.uuid){
			console.log("qqqq")
			result = await Post.find({"uuid":args.data.uuid})
		}
		else{
			if(args.data.writer===""){
				if(have_sketch && have_non_sketch){
					result = await Post.find({
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else if(have_sketch && !have_non_sketch){
					result = await Post.find({"is_sketch":true,
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else if(!have_sketch && have_non_sketch){
					result = await Post.find({"is_sketch":false,
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else{
					result = []
				}
			}
			else{
				if(have_sketch && have_non_sketch){
					result = await Post.find({"writer":args.data.writer, 
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else if(have_sketch && !have_non_sketch){
					result = await Post.find({"writer":args.data.writer, "is_sketch":true,
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else if(!have_sketch && have_non_sketch){
					result = await Post.find({"writer":args.data.writer, "is_sketch":false,
												$or: [ { "content": {$regex:args.data.keyword} }, { "tags": {$elemMatch:{$regex:args.data.keyword},}}, {"name":{$regex:args.data.keyword}} ]
											})
				}
				else{
					result = []
				}
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
					name: result[i].name,
					date:    result[i].date,
					tags:    result[i].tags,
					is_sketch: result[i].is_sketch,
					uuid:    result[i].uuid
				})
			}
			for(var i=0; i<record.length;++i){
				let list = await Great.find({"uuid":record[i].uuid})
				console.log(list[0])
				let num = list.length
				console.log(num)
				record[i]['great_num'] = num
			} 
			console.log(record)
			return {
				posts: record
			}
		}
	},
	async greatOfpost(parent, args, { db }, info) {
		let result = await Great.find({"uuid":args.data.uuid})
		let record = []
		for(var i=0; i<result.length; ++i){
			let _user = await User.find({"account":result[i].account})
			let result_name = _user[0].name
			record.push({
				account:result[i].account,
				name:result_name
			})
		}
		console.log(record)
		return {
			users:record
		}
	},
	async greatOfuser(parent, args, { db }, info) {
		let result = await Great.find({"account":args.data.account})
		let record = []
		for(var i=0; i<result.length;++i){
			let temp_post = (await Post.find({"uuid":result[i].uuid}))[0]
			let list       = await Great.find({"uuid":temp_post.uuid})
			let num = list.length
			record.push({
				content:   temp_post.content,
				tags:      temp_post.tags,
				writer:    temp_post.writer,
				name:      temp_post.name,
				date:      temp_post.date,
				is_sketch: temp_post.is_sketch,
				uuid:      temp_post.uuid,
				great_num: num
			})
		}
		return {
			posts:record
		}
	}
}


export { Query as default }
