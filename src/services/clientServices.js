const con = require("../config/bd");

const createClient= async(dataClient)=>{
    try {
        const newClient=await con.query("INSERT INTO cliente SET ?",[dataClient]);
        return newClient;
    } catch (error) {
        throw new Error("Error en la consulta");
    }
}

const getOneClientByDni=async(dni)=>{
    const client=await con.query("SELECT * FROM cliente WHERE dni_cli=?",[dni]);
    return client[0];
}

module.exports={
    createClient,
    getOneClientByDni
}