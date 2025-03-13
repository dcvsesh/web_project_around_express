const express = require('express');
const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/aroundb",{})
.then(() => {
  console.log('Conectado a la base de datos')
})
.catch((error) => {
  console.log("Error al conectar a la base de datos", error)
});

app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  req.user = {
    _id: '67d34b94e8aa251d559eba5d' // pega el _id del usuario de prueba que creamos en el paso anterior
  };

  next();
});

app.get("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});
