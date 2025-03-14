const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"El nombre es requerido"],
    minlength: [2, "El nombre debe de tener al menor 2 caracteres"],
    maxlength: [30,"El nombre debe de tener como máximo 30 caracteres"],
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
          return  /^(https?:\/\/)(www\.)?[\w.-]+\.[a-z]{2,}(\/[\w._~:/?%#\[\]@!$&'()*+,;=-]*)?#?$/i.test(value);
        },
        message: "La URL de la imagen no es válida."
      }
  },
});

module.exports = mongoose.model('User', userSchema);