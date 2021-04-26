const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");
const observacoesPorLojistaId = {};

const {
    v4:uuidv4
} = require("uuid");

const funcoes = {
    ObservacaoClassificada : (observacao) => {
        const observacoes = 
            observacoesPorLojistaId[observacao.lojistaId];
        const obsParaAtualizar = observacoes.status;
        axios.post("http://localhost:10000/eventos", {
            tipo: "ObservacaoAtualizada",
            dados: {
                id: observacao.id,
                lojista: observacao.lojista,
                lojistaId: observacao.lojistaId,
                status: observacao.status
            }
        });
    } //ObservacaoClassificada
} //const funcoes
app.post("/eventos", (req, res) => {
    try {
        funcoes[req.body.tipo](req.body.dados);
    }catch(err){}
    res.status(200).send({msg:"ok"});
});
app.put("/lojistas/:id/observacoes", async(req, res) => {
    const idObs = uuidv4();
    const {
        lojistas = [
            {
            id:id ,
            INSCRICAO: [lojista.INSCRICAO],
            nomeFantasia: lojista.nomeFantasia,
            razaoSocial: lojista.razaoSocial,
            Endereco: lojista.Endereco,
            Numero: lojista.Numero,
            CEP: lojista.CEP,
            Telefone: lojista.Telefone,
            Email: lojista.Email
            }
        ],
    } = req.body;
    const observacoesDoLojista =
        observacoesPorLojistaId [req.params.id] || [];
    observacoesDoLojista.push({
            id: idObs,
            lojistas = [
                {
                id:id ,
                INSCRICAO: [lojista.INSCRICAO],
                nomeFantasia: lojista.nomeFantasia,
                razaoSocial: lojista.razaoSocial,
                Endereco: lojista.Endereco,
                Numero: lojista.Numero,
                CEP: lojista.CEP,
                Telefone: lojista.Telefone,
                Email: lojista.Email
                }
            ],
            status: "aguardando"
    });
        observacoesPorLojistaId[req.params.id] = 
        observacoesDoLojista;
    
    await axios.post("http://localhost:10000/eventos", {
        tipo: "ObservacaoCriada",
        dados: {
            id: idObs,
            lojistas = [
                {
                id:id ,
                INSCRICAO: [lojista.INSCRICAO],
                nomeFantasia: lojista.nomeFantasia,
                razaoSocial: lojista.razaoSocial,
                Endereco: lojista.Endereco,
                Numero: lojista.Numero,
                CEP: lojista.CEP,
                Telefone: lojista.Telefone,
                Email: lojista.Email
                }
            ],
            lembreteId: req.params.id, 
            status: "aguardando"

        }
    })
    res.status(201).send(observacoesDoLojista);
}); //app.put()
app.get("/lojistas/:id/observacoes", (req, res) => {
    res.send(observacoesPorLojistaId[req.params.id] || []);
});
app.listen(500, (() => {
    console.log("Lojistas. Porta 5000");
}));
