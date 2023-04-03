const router = require('express').Router();

const user = require('../../controllers/user');

/**
 * Create and get all users
 */
router.route('/').get(user.getUsers).post(user.create);

/**
 * Get, update and delete by user ID
 */
router.route('/:userId').get(user.getUser).put(user.update).delete(user.delete);

/**
 * Create and delete user and user referances
 */
router.route('/:userId/friends/:friendId').post(user.updateFriend).delete(user.deleteFriend);

module.exports = router;