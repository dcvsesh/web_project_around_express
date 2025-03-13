const express = require('express');
const router = express.Router();
const {getUsers, getUserId, createUser, updateUserProfile, updateUserAvatar} = require("../controllers/Users")

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/',createUser);
//
router.patch('/me',updateUserProfile);
router.patch('/me/avatar',updateUserAvatar)

module.exports = router;