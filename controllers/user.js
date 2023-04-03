const { userModel, thoughtModel } = require("../models");

module.exports = {
  /**
   * List all users
   * @param {*} req 
   * @param {*} res 
   */
  async getUsers(req, res) {
    try{
        const allUsers = await userModel.find({});
        if(allUsers){
            return res.json(allUsers)
        }else{
            return res.json({ message: "No users found!"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
  },
 
  /**
   * get user by id
   * @param {*} req 
   * @param {*} res 
   */
  async getUser(req, res) {
    try{
        const user = await userModel.findOne({ _id: req.params.userId });
        if(user){
            res.json(user)
        }else{    
            return res.json({ message: "User not found!"})
        }
    }catch(err){
        return res.status(500).json(err);
    }
  },

  /**
   * Create new user
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  async create(req, res) {
        try{
            const newUser = await userModel.create(req.body)
            if(newUser){
                return res.json(newUser)
            }
        }catch(err){
            return res.status(500).json(err);
        }
  },
  
  /**
   * Update user by id
   * @param {*} req 
   * @param {*} res 
   */
  async update(req, res) {
    try{
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if(updatedUser){
            return res.json(updatedUser)
        }else{
            return res.status(400).json({message: "Unable to find the user!"})
        }
    }catch(err){
        return res.status(500).json(err)
    }
  },

 /**
  * Delete user and thoughts
  * @param {*} req 
  * @param {*} res 
  * @returns 
  */
  async delete(req, res) {
    try{
        const deleteUser = await userModel.findOneAndDelete({ _id: req.params.userId });

        if(deleteUser){
            const deleteThoughts =  await thoughtModel.deleteMany({ _id: { $in: userModel.thoughts } })
            return res.json({ message: "User and Thought deleted!" })
        }else{
            return res.status(400).json({message: "Unable to find the user!"})
        }

    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
  },

  /**
   * update Friends by userId
   * @param {*} req 
   * @param {*} res 
   */
  async updateFriend(req, res) {

    try{
        const updateFriend = await userModel.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        if(updateFriend){
            return res.json(updateFriend)
        }else{
            return res.status(400).json({message: "User not found!"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
  },
  
  /**
   * Delete friends by userId
   * @param {*} req 
   * @param {*} res 
   */
  async deleteFriend(req, res) {
    try{
        const deleteFriend = await userModel.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
          )

        if(deleteFriend){
            return res.json(deleteFriend);
        }else{
            return res.status(400).json({ message: "User not Found!"})
        }

    }catch(err){
        return res.status(500).json(err);
    }
  },
};