// incluir bibliotce de conexão
const mysql = require("mysql2");

//criar conexão com banco de dados
const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "senai" // criar o banco de dados
});

conexao.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar")
    }
    console.log("Conectado com sucesso")
});

module.exports = conexao;