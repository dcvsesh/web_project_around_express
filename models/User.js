const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
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