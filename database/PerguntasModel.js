const sequelize = require('sequelize');
const connection = require('./conexao');
const Pergunta = connection.define('TabelaPergunta',{
    titulo:{
        type:sequelize.STRING,
        allowNull:false
    },
    descricao:{
        type:sequelize.TEXT,
        allowNull:false
    }
});
Pergunta.sync({force:false}).then(()=>{
    console.log('TabelaPerguntas criada!')
});
module.exports=Pergunta;