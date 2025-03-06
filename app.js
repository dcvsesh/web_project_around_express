const express = require("express");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ message: "Recurso solicitado no encontrado" });
});

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto 3000");
});
