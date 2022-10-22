
const mysql = require('mysql');
const options = require('./options')

const mysqlConnection = mysql.createConnection(options);

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('RSE CONECTO')
    }
});

module.exports = mysqlConnection;