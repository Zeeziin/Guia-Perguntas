const sequelize = require('sequelize');
const connection = require('./conexao');
const Respostas = connection.define('tabelaresposta', {
    corpo:{
        type:sequelize.STRING,
        allowNull:false
    },
    respostaId:{
        type:sequelize.NUMBER,
        allowNull:false
    }
});
Respostas.sync({force:false}).then(()=>{
    console.log('TabelaRespostas criada!')
});
module.exports=Respostas;