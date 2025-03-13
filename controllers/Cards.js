const Card = require("../models/Card");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las tarjetas", error });
  }
};

const createCard = async (req, res) => {
  try {
    const { name, link} = req.body;
    const owner = req.user._id;
    console.log(req.user._id);
    const newCard = new Card({ name, link, owner});
    const saveCard = await newCard.save();
    return res.status(201).json(saveCard);
  } catch (error) {
    res.status(400).send({ message: "Error al crear tarjeta", error });
  }
};


const deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId).orFail(
      () => new Error("DocumentNotFound")
    );
    res.status(200).send({ message: "Tarjeta eliminada exitosamente", card });
  } catch (error) {
    if (error.message === "DocumentNotFound") {
      return res.status(404).send({ message: "Tarjeta no encontrada" });
    }
    res.status(500).send({ message: "Error al borrar tarjeta", error });
  }
};

module.exports = {
  getCards, createCard, deleteCard
};