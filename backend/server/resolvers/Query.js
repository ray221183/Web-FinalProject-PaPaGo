import { string } from 'yargs'

const User = require('../models/user')


const Query = {
	async user(parent, args, { db }, info) {
		let result = await User.find({"account":args.data.account, "password":args.data.password})
		console.log("found length:",result.length)
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
			console.log(result[0])
			return {
				first_name:result[0].first_name,
				last_name:result[0].last_name,
				account:result[0].account,
				password:result[0].password,
				valid: true};
		}
	}
}


export { Query as default }
