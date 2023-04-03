const router = require('express').Router();

const thought = require('../../controllers/thought');


router.route('/').get(thought.getThoughts).post(thought.create);

router.route('/:thoughtId').get(thought.getThought).put(thought.update).delete(thought.delete);

router.route('/:thoughtId/reactions').post(thought.createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(thought.deleteReaction);


module.exports = router;