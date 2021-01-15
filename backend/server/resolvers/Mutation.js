import uuidv4 from 'uuid/v4'
const User= require('../models/user')
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
  }
}

export { Mutation as default }
