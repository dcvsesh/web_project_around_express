const express = require('express');
const router = express.Router();
const {getCards, createCard, deleteCard, likeCard, dislikeCard} = require("../controllers/Cards")

router.get('/', getCards);
router.post('/', createCard);
router.delete('/',deleteCard);
//
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes',dislikeCard);

module.exports = router;
