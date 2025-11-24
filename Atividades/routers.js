const express = require("express");
const conexao = require("./db");

//Método que contém GET, POST, DELETE, PUT
const routers = express.Router();

//Rota para cadastrar pacientes
routers.post("/cadastrar", (req, res) => {
    //POST o objeto da requisição vem pelo corpo = req.body;
    const { nome, idade, sexo, tipo_sanguineo, diagnostico, setor } = req.body;

    try {
        //Realizar a query no banco de dados
        conexao.query("INSERT INTO pacientes_registro (nome, idade, sexo, tipo_sanguineo, diagnostico, setor) VALUES(?,?,?,?,?,?)",
            [nome, idade, sexo, tipo_sanguineo, diagnostico, setor], (erro) => {
                if (erro) {
                    console.log(erro);
                    res.json({ msg: "Erro ao cadastrar o paciente" });
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

//Rota para listar os pacientes
routers.get("/listar", (req, res) => {
    try {
        const sql = "SELECT id, nome, idade, sexo, tipo_sanguineo, diagnostico, setor, data_entrada FROM pacientes_registro";

        conexao.query(sql, (erro, resultado) => {
            if (erro) {
                res.json({ msg: "Erro ao obter a lista de pacientes" });
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

//Rota para listar os pacientes por ID
routers.get("/listar/:id", (req, res) => {
    const sql = "SELECT nome, idade, sexo, tipo_sanguineo, diagnostico, setor, data_entrada  FROM pacientes_registro WHERE id = ?";

    // req.params para recuperar id pelo parâmetro da requisição
    conexao.query(sql, [req.params.id], (erro, resultado) => {
        if (erro) {
            res.json({ msg: "Erro ao buscar paciente por id" });
        }
        else {
            res.json(resultado);
        }

    });
});

module.exports = routers;