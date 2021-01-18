import { string } from 'yargs'

const User = require('../models/user')
const Post = require('../models/post')
const Great = require('../models/great')


const Query = {
	async user(parent, args, { db }, info) {
		console.log("backend user")
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
		let key_words = args.data.keyword.split(" ")
		let content_filter_function = []
		let tag_filter_function = []
		let name_filter_function = []
		let title_filter_function = []
		let introduction_filter_function = []
		for(var i=0; i<key_words.length;++i){
			content_filter_function.push({
				"content":{"$regex":key_words[i]}
			})
		}
		content_filter_function = {$and:content_filter_function}
		for(var i=0; i<key_words.length;++i){
			title_filter_function.push({
				"title":{"$regex":key_words[i]}
			})
		}
		title_filter_function = {$and:title_filter_function}
		for(var i=0; i<key_words.length;++i){
			introduction_filter_function.push({
				"introduction":{"$regex":key_words[i]}
			})
		}
		introduction_filter_function = {$and:introduction_filter_function}
		for(var i=0; i<key_words.length;++i){
			name_filter_function.push({
				"name":{"$regex":key_words[i]}
			})
		}
		name_filter_function = {$and:name_filter_function}
		for(var i=0; i<key_words.length;++i){
			tag_filter_function.push({
				"tags":{"$elemMatch":  { "$eq":key_words[i] } }
			})
		}
		tag_filter_function = {$and:tag_filter_function}
		if(args.data.uuid !== "" && args.data.uuid){
			result = await Post.find({"uuid":args.data.uuid})
		}
		else{
			if(args.data.writer===""){
				if(have_sketch && have_non_sketch){
					result = await Post.find({
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
											})
				}
				else if(have_sketch && !have_non_sketch){
					result = await Post.find({"is_sketch":true,
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
											})
				}
				else if(!have_sketch && have_non_sketch){
					result = await Post.find({"is_sketch":false,
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
											})
				}
				else{
					result = []
				}
			}
			else{
				if(have_sketch && have_non_sketch){
					result = await Post.find({"writer":args.data.writer, 
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
											})
				}
				else if(have_sketch && !have_non_sketch){
					result = await Post.find({"writer":args.data.writer, "is_sketch":true,
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
											})
				}
				else if(!have_sketch && have_non_sketch){
					result = await Post.find({"writer":args.data.writer, "is_sketch":false,
												$or: [ title_filter_function,introduction_filter_function,content_filter_function, tag_filter_function, name_filter_function ]
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
					introduction: result[i].introduction,
					title:result[i].title,
					content: result[i].content,
					writer:  result[i].writer,
					name: result[i].name,
					date:    result[i].date,
					tags:    result[i].tags,
					is_sketch: result[i].is_sketch,
					uuid:    result[i].uuid,
					related_uuid:result[i].related_uuid
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
	async multi_post(parent, args, { db }, info){
		let final_result = []
		let have_sketch = args.data.get_sketch
		let have_non_sketch = args.data.get_non_sketch
		let key_word_list = args.data.keyword
		let key_record = []
		let trending_detect = []
		console.log(key_word_list.length)
		for(var j=0;j<key_word_list.length;++j){
			console.log(key_record.length)
			let key_words = key_word_list[j].split(" ")
			if(key_words.includes('trending')){
				let index = key_words.indexOf('trending')
				console.log(key_words)
				console.log("index",index)
				key_words = key_words.slice(0,index).concat(key_words.slice(index+1))
				console.log(key_words)
				trending_detect.push(true)
				if(key_words.length === 0){
					key_words.push("")
				}
				console.log(key_words)
			}
			else{
				trending_detect.push(false)
			}
			let content_filter_function = []
			let tag_filter_function = []
			let name_filter_function = []
			let title_filter_function = []
			let introduction_filter_function = []
			for(var i=0; i<key_words.length;++i){
				content_filter_function.push({
					"content":{"$regex":key_words[i]}
				})
			}
			content_filter_function = {$and:content_filter_function}
			for(var i=0; i<key_words.length;++i){
				name_filter_function.push({
					"name":{"$regex":key_words[i]}
				})
			}
			name_filter_function = {$and:name_filter_function}
			for(var i=0; i<key_words.length;++i){
				title_filter_function.push({
					"title":{"$regex":key_words[i]}
				})
			}
			title_filter_function = {$and:title_filter_function}
			for(var i=0; i<key_words.length;++i){
				introduction_filter_function.push({
					"introduction":{"$regex":key_words[i]}
				})
			}
			introduction_filter_function = {$and:introduction_filter_function}
			for(var i=0; i<key_words.length;++i){
				tag_filter_function.push({
					"tags":{"$elemMatch":  { "$eq":key_words[i] } }
				})
			}
			tag_filter_function = {$and:tag_filter_function}
			key_record.push([title_filter_function,introduction_filter_function,content_filter_function,tag_filter_function,name_filter_function])			
		}
		console.log(key_record.length)
		for(var i=0; i<key_record.length;++i){
			let result = []
			if(args.data.uuid !== "" && args.data.uuid){
				let temp = await Post.find({"uuid":args.data.uuid})
				result = temp
			}
			else{
				if(args.data.writer===""){
					if(have_sketch && have_non_sketch){
						let temp = await Post.find({
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else if(have_sketch && !have_non_sketch){
						result = await Post.find({"is_sketch":true,
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else if(!have_sketch && have_non_sketch){
						let temp = await Post.find({"is_sketch":false,
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else{
						let temp = []
						result = temp
					}
				}
				else{
					if(have_sketch && have_non_sketch){
						let temp = await Post.find({"writer":args.data.writer, 
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else if(have_sketch && !have_non_sketch){
						let temp = await Post.find({"writer":args.data.writer, "is_sketch":true,
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else if(!have_sketch && have_non_sketch){
						let temp = await Post.find({"writer":args.data.writer, "is_sketch":false,
													$or: [ key_record[i][0], key_record[i][1], key_record[i][2], key_record[i][3], key_record[i][4]]
												})
						result = temp
					}
					else{
						let temp = []
						result = temp
					}
				}
			}
			console.log(result)
			let last_record = []
			for(var j=0; j<result.length; ++j){
				last_record.push({
					introduction: result[j].introduction,
					title:result[j].title,
					content: result[j].content,
					writer:  result[j].writer,
					name: result[j].name,
					date:    result[j].date,
					tags:    result[j].tags,
					is_sketch: result[j].is_sketch,
					uuid:    result[j].uuid,
					related_uuid:result[j].related_uuid
				})
			}
			for(var j=0; j<last_record.length;++j){
				let list = await Great.find({"uuid":last_record[j].uuid})
				let num = list.length
				last_record[j]['great_num'] = num
			} 
			console.log(last_record)
			if(trending_detect[i]){
				last_record.sort(function(a,b){
					return b.great_num - a.great_num
				})
			}
			if(last_record.length >= 20){
				last_record = last_record.slice(0,20)
			}
			final_result.push({posts:last_record})
		}
		return {
			multiposts:final_result
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
