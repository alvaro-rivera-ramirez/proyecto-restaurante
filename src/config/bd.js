
const mysql = require('mysql2');
const options = require('./options')
const promisify=require('util').promisify;
const connection = mysql.createConnection(options);

connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log('CONECTADO A LA BASE DE DATOS')
    }
});

connection.query=promisify(connection.query)
module.exports = connection;