const { userModel, thoughtModel } = require("../models");

module.exports = {
  
    /**
     * List all thoughts
     * @param {*} req 
     * @param {*} res 
     * @returns array
     */
    async getThoughts(req, res) {
        try{
            const thoughts = await thoughtModel.find({});
            if(thoughts){
                return res.json(thoughts);
            }else{
                res.status(400).json({ message: "No thoughts found!" })
            }
        }catch(err){
            return res.status(500).json(err)
        }
    },

    /**
     * Get thought by ID
     * @param {*} req 
     * @param {*} res 
     */
    async getThought(req, res) {
        try{
            const thoughts = await thoughtModel.findOne({ _id: req.params.thoughtId });
            if(thoughts){
                return res.json(thoughts)
            }else{
                return res.status(400).json({ message: "Thought not found!"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    },

    /**
     * Create new thought
     * @param {*} req 
     * @param {*} res 
     */
    async create(req, res) {
        try{
            const createThought = await thoughtModel.create(req.body);
            if(createThought){
                await userModel.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: createThought._id } },
                    { new: true }
                );
                return res.json(createThought);
            }else{
                return res.status(400).json({ message: "Unable to create new thought!"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json(err)
        }
    },

    /**
     * Update thought
     * @param {*} req 
     * @param {*} res 
     */
    async update(req, res) {
        try{
            const updateThought = await thoughtModel.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, New: true }
            );
            if(updateThought){
                return res.json(updateThought)
            }else{
                return res.status(400).json({message: "No thought found!"})
            }
        }catch(err){
            console.log(err);
            return res.status(500).json(err)
        }
    },

    /**
     * Delete thought by ID
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async delete(req, res) {
        try{
            const deleteThought = await thoughtModel.findOneAndDelete({ _id: req.params.thoughtId });
            if(deleteThought){
                const updateUserThought = await userModel.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                )
                return res.json(deleteThought)
            }else{
                return res.status(400).json({message: "No thought found!"})
            }

        }catch(err){
            console.log(err);
            return res.status(500).json(err)
        }
    },

    /**
     * create reaction 
     * @param {*} req 
     * @param {*} res 
     */
    async createReaction(req, res) {
        try{
            const createReaction = await  thoughtModel.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if(createReaction){
                return res.json(createReaction);
            }else{
                return res.status(400).json({ message: "No thought found!" })
            }
        }catch(err){
            console.log(err);
            return res.status(500).json(err)
        }
    },

   /**
    * Deleate reaction
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async deleteReaction(req, res) {
        try{
            const deleteReaction = await thoughtModel.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if(deleteReaction){
                return res.json(deleteReaction);
            }else{
                return res.status(400).json({ message: "Thought not found!" })
            }    
        }catch(err){
            return res.status(500).json(err)
        }
    },
};