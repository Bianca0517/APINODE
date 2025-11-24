const express = require("express");
const conexao = require("./db");

//Método que contém GET, POST, DELETE, PUT
const routers = express.Router();

//Rota RAIZ
routers.get("/", (req, res) => {
    //API devolve uma resposta
    res.json({ msg: "API ONLINE" })
});

//Rota para cadastrar objeto no banco de dados
routers.post("/cadastrar", (req, res) => {
    //POST o objeto da requisição vem pelo corpo = req.body;
    const { nome, cidade, estado, endereco, cep, numero, idade } = req.body;


    try {
        //Realizar a query no banco de dados
        conexao.query("INSERT INTO cadastrar_usuarios (nome, cidade, estado, endereco, cep, numero, idade) VALUES(?,?,?,?,?,?,?)",
            [nome, cidade, estado, endereco, cep, numero, idade], (erro) => {
                if (erro) {
                    res.json({ msg: "Erro ao cadastrar o usuário" });
                }
                else {
                    res.json({ msg: "Cadastro realizado com sucesso" });
                }
            });
    }
    catch (erro) {
        console.log(erro);
        res.json({ msg: "Erro no servidor" })
    };
});

//Rota para listar objetos
routers.get("/listar", (req, res) => {
    try {
        const sql = "SELECT id, nome, cidade, estado, endereco, cep, numero, idade, data_cadastro FROM cadastrar_usuarios";

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.json({ msg: "Erro ao obter a lista de usuários" });
            }
            else {
                res.json(resultado);
            }
        });
    }
    catch (erro) {
        res.json({ msg: ":Erro no servidor" });
    }
});

//Rota para listar objeto por ID
routers.get("/listar/:id", (req, res) => {
    const sql = "SELECT * FROM cadastrar_usuarios WHERE id = ?";

    // req.params para recuperar id pelo parâmetro da requisição
    conexao.query(sql, [req.params.id], (erro, resultado) => {
        if (erro) {
            res.json({ msg: "Erro ao buscar usuário por id" });
        }
        else {
            res.json(resultado);
        }

    });
});

// Rota para deletar objeto no Banco de Dados
routers.delete("/deletar/:id", (req, res) => {
    //consultar o objeto no banco de dados
    const sql = "SELECT id FROM cadastrar_usuarios WHERE id = ?";

    conexao.query(sql, [req.params.id], (erro, rows) => {
        if (erro) {
            res.json({ msg: "Erro ao buscar o id" });
        }
        else if (rows.length > 0) {
            //Sql para deletar o objeto do banco
            const deletar = "DELETE FROM cadastrar_usuarios WHERE id = ?";

            conexao.query(deletar, [req.params.id], (erro) => {
                if (erro) {
                    res.json({ msg: "Erro ao deletar o usuário" });
                }
                else {
                    res.json({ msg: "Usuário deletado com sucesso" });
                }
            });
        }
        else {
            res.json({ msg: `O ID ${req.params.id} não existe no Banco de Dados` });
        }

    });
});

//Rota para atualizar um objeto por ID no Banco de Dados
routers.put("/atualizar/:id", (req, res) => {
    // receba os campos a serem atualizados pelo corpo
    const { nome, endereco, cidade } = req.body;

    //consultar o objeto no banco de dados
    const sql = "SELECT id FROM cadastrar_usuarios WHERE id = ?";

    conexao.query(sql, [req.params.id], (erro, rows) => {
        if (erro) {
            res.json({ msg: "Erro ao buscar o id" });
        }
        else if (rows.length > 0) {
            //Sql para atualizar o objeto do banco
            const atualizar = "UPDATE cadastrar_usuarios SET nome = ?, endereco = ?, cidade = ? WHERE id = ?";

            conexao.query(atualizar, [nome, endereco, cidade, req.params.id], (erro) => {
                if (erro) {
                    console.log(erro);
                    res.json({ msg: "Erro ao atualizar o usuário" });
                }
                else {
                    res.json({ msg: "Usuário atualizado com sucesso" });
                }
            });
        }
        else {
            res.json({ msg: `O ID ${req.params.id} não existe no Banco de Dados` });
        }

    });
});



module.exports = routers;