const express = require('express');
const router = express.Router();
const {getUsers, getUserId, createUser} = require("../controllers/Users")

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/',createUser)

module.exports = router;