//Arquivo main que faz a chamada de todas classes do projeto
const express = require("express");// Importa a biblioteca express
const routers = require("./routers");

const app = express();

app.use(express.json());// Habilita para utilizar objeto JSON
app.use(routers);//Utilizar as rotas

app.listen(3001, () => {
    console.log("Servidor executando na url http://localhost:3001")
});
