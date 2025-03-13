const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener a los usuarios", error });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(404).send({ message: "Error al buscar usuario", error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    const saveUser = await newUser.save();
    return res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).send({ message: "Error al crear usuario", error });
  }
};

module.exports = {
  getUsers, getUserId, createUser
};