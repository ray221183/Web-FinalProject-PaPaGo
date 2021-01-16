import uuidv4 from 'uuid/v4'
const User= require('../models/user')
const Post= require('../models/post')
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
		var temp_data = args.data
		temp_data['uuid'] = uuidv4()
		let temp = new Post(temp_data)
		await temp.save()
		return "restoring post complete."
	},
	async deletePost(parent, args, {db}, info){
		await Post.deleteMany({"uuid": args.data.uuid})
		return "delete complete"
	},
	async updatePost(parent, args, {db}, info){
		let temp = await Post.findOneAndUpdate({"uuid":args.data.uuid},{"content":args.data.content, "tags":args.data.tags, "date":args.data.data, "is_sketch":args.data.is_sketch})
		return {
			content: args.data.content,
			tags: args.data.tags,
			date: args.data.date,
			writer: temp.writer,
			is_sketch: args.data.is_sketch,
			uuid: temp.uuid
		}
		
	}

}

export { Mutation as default }
