const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().orFail(() => {
      const error = new Error("No se encontraron usuarios");
      error.statusCode = 404;
      throw error;
    });
    res.json(users);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al obtener a los usuarios", error: error.message });
  }
};

const getUserId = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json(user);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al buscar usuario", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = new User({ name, about, avatar });
    const saveUser = await newUser.save();
    return res.status(201).json(saveUser);
  } catch (error) {
    res.status(500).send({ message: "Error al crear usuario", error });
  }
};

//
const updateUserProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
req.user._id,
      { name, about }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json(updatedUser);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al actualizar el perfil", error: error.message });
  }
};

const updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
req.user._id,
      { avatar }
    ).orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json(updateAvatar);
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al actualizar el avatar", error: error.message });
  }
};

module.exports = {
  getUsers, getUserId, createUser, updateUserProfile, updateUserAvatar
};