const express = require('express');
const router = express.Router();
const {getCards, createCard, deleteCard} = require("../controllers/Cards")

router.get('/', getCards);
router.post('/', createCard);
router.delete('/',deleteCard);

module.exports = router;
