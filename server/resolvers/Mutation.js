const uuidv4 = require('uuid/v4')
const User= require('../models/user')
const Post= require('../models/post')
const Great= require('../models/great')
const Image = require('../models/img')
const Mutation = {
	async addUser(parent, args, {db}, info){
		let result = await User.find({"account":args.data.account})
		if(result.length > 0)
		{
			return 'The name of account has been used.'
		}
		else{
			let temp = new User(args.data)
			await temp.save()
			return 'register success.'
		}
	},
	async addPost(parent, args, {db}, info){
		console.log("add post args.data", args.data)
		var temp_data = args.data
		temp_data['uuid'] = uuidv4()
		let writers = await User.find({"account":args.data.writer})
		if(writers.length === 0){
			return "0"
		}
		if(!args.data.related_uuid){
			temp_data['related_uuid'] = ""
		}
		else{
			console.log(args.data.related_uuid,temp_data.uuid)
			await Post.findOneAndUpdate({"uuid":args.data.related_uuid},{"related_uuid":temp_data.uuid})
		}
		let name = writers[0].name
		temp_data['name'] = name
		let temp = new Post(temp_data)
		console.log(temp)
		await temp.save()
		return temp.uuid
	},
	async deletePost(parent, args, {db}, info){
		let temp_post = await Post.find({"uuid":args.data.uuid})
		temp_post = temp_post[0]
		if((temp_post.related_uuid !== "") && (!temp_post.is_sketch)){
			await Post.updateOne({"uuid":temp_post.related_uuid}, {
				$set:{
					"related_uuid":""
				}
			})
		}
		await Post.deleteMany({"uuid": args.data.uuid})
		await Image.deleteMany({"uuid":args.data.uuid})
		return "delete complete"
	},
	async updatePost(parent, args, {db}, info){
		if(!args.data.is_sketch){
			let temp_post = await Post.find({"uuid":args.data.uuid})
			temp_post = temp_post[0]
			console.log(temp_post)
			let parent_uuid = temp_post.related_uuid
			console.log(parent_uuid)
			if(parent_uuid !== ""){
				await Post.deleteMany({"uuid":parent_uuid})
				console.log(args.data.uuid)
				await Post.updateOne({"uuid":args.data.uuid},
				{   $set:{
						"title": args.data.title,
						"introduction": args.data.introduction,
						"content": args.data.content,
						"tags": args.data.tags,
						"name": temp_post.name,
						"date": args.data.date,
						"writer": temp_post.writer,
						"is_sketch": args.data.is_sketch,
						"uuid": parent_uuid,
						"related_uuid": ""
					}
				})
				return  {title: args.data.title,
							introduction: args.data.introduction,
							content: args.data.content,
							tags: args.data.tags,
							name: temp_post.name,
							date: args.data.date,
							writer: temp_post.writer,
							is_sketch: args.data.is_sketch,
							uuid: parent_uuid,
							related_uuid: ""
					    }
			}
		}
		let temp = await Post.find({"uuid":args.data.uuid})
		temp = temp[0]
		await Post.findOneAndUpdate({"uuid":args.data.uuid},
										{"content":args.data.content, "tags":args.data.tags, "date":args.data.date, 
										"is_sketch":args.data.is_sketch, "title":args.data.title,"introduction":args.data.introduction})
		return {
			title: args.data.title,
			introduction: args.data.introduction,
			content: args.data.content,
			tags: args.data.tags,
			date: args.data.date,
			writer: temp.writer,
			name: temp.name,
			is_sketch: args.data.is_sketch,
			uuid: temp.uuid,
			related_uuid:temp.related_uuid
		}

	},
	async updateGreat(parent, args, {db}, info) {
		console.log('In updateGreat');
		console.log('args.data.is_push = ', args.data.is_push);
		if(args.data.is_push){
			let record = {
				uuid:args.data.uuid,
				account:args.data.account
			}
			let temp = new Great(record)
			await temp.save()
			return "add complete"
		}
		else{
			await Great.deleteMany({"uuid":args.data.uuid,"account":args.data.account})
			return "delete complete"
		}
	},
	async uploadImage(parent, args, {db}, info){
		let temp = new Image(args.data)
		let result = await Image.find({"uuid":args.data.uuid})
		if(result.length >= 1){
			await Image.updateOne({"uuid":args.data.uuid},{
				$set:{
					"image":args.data.image
				}
			})
			return "change image"
		}
		else{
			await temp.save()
			return "upload first image"
		}
	}
}

module.exports = Mutation
