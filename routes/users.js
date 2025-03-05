const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get("/",(req, res)=>{
return fs.readFile(path.join(__dirname,"../data/users.json"),
"utf-8",
(err,data)=>{
if(err){
  console.log(err);
  return
}
const users = JSON.parse(data);
res.send(users);
}
);
});

router.get("/:id", (req, res)=>{
  const params = req.params;
  const id = params.id;
  return fs.readFile(path.join(__dirname,"../data/users.json"),
"utf-8",
(err,data)=>{
if(err){
  console.log(err);
  return
}
const users = JSON.parse(data);
const user = users.find(items => items._id === id)
if(!user){
  return res.status(404).send({message: "ID de usuario no encontrado"});
}

res.send(user)
}

);
})

module.exports = router;

