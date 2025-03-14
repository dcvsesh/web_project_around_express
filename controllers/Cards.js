const Card = require("../models/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find().orFail(() => {
      const error = new Error("No se encontraron tarjetas");
      error.statusCode = 404;
      throw error;
    });
    res.json(cards);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al obtener las tarjetas", error: error.message });
  }
};

const createCard = async (req, res) => {
  const { name, link} = req.body;
  const owner = req.user._id;
  const newCard = new Card({ name, link, owner});
  try {
    const saveCard = await newCard.save();
    return res.status(201).json(saveCard);
  } catch (error) {
    res.status(500).json({ message: "Error al crear tarjeta", error: error.message });
  }
};


const deleteCard = async (req, res) => {
  const {cardId} = req.params;
  try {
    const card = await Card.findByIdAndDelete(cardId).orFail(() => {
      const error = new Error("No se ha encontrado ninguna tarjeta con esa id");
      error.statusCode = 404;
      throw error;
    });
    res.status(200).send({ message: "Tarjeta eliminada exitosamente", card });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al borrar tarjeta", error: error.message });
  }
};

//
const likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.json(card);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al dar like a la tarjeta", error: error.message });
  }
};

const dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    ).orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    });
    res.json(card);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message:"Error al quitar like a la tarjeta", error: error.message });
  }
};


module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard
};