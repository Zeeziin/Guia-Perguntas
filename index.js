const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const TabelaPerguntas = require('./database/PerguntasModel');
const TabelaRespostas = require('./database/RespostasModel');
const Respostas = require('./database/RespostasModel');

//Falando para o Express usar o EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));


//Transformando os dados enviados pelo Front-end em em Json e possibilitando seu uso no Back-end pelo bodyParser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    TabelaPerguntas.findAll({raw:true, order:[['createdAt','DESC']]}).then((perguntas)=>{
        res.render('index', {
            perguntas:perguntas
        });
    });
});

app.get('/perguntar',(req,res)=>{
    res.render('perguntar');
});

app.post('/salvarpergunta',(req,res)=>{
    var titulo123 = req.body.titulo
    var descricao123 = req.body.descricao
    TabelaPerguntas.create({
        titulo:titulo123,
        descricao:descricao123
    }).then(()=>{
        res.redirect('/');
    });
});

app.get('/pergunta/:id',(req,res)=>{
    var id = req.params.id;
    TabelaPerguntas.findOne({
        where:{id:id}
    }).then((pergunta=>{
        if (pergunta != undefined){
            TabelaRespostas.findAll({
                raw:true,
                where:{respostaId:pergunta.id}
            }).then((respostas=>{
                res.render('pergunta',{
                    pergunta:pergunta,
                    respostas:respostas
                });
            }));
        }else{
            res.redirect('/');
        };
    }));
    });


app.post('/salvarresposta',(req,res)=>{
    TabelaRespostas.create({
        corpo: req.body.corpo,
        respostaId: req.body.perguntaid
    }).then(()=>{
        res.redirect('/pergunta/'+req.params.id);
    })
})


app.listen(8181,()=>{
    console.log("Servidor iniciado");
});
