const ClientServices=require("../services/clientServices");
const {
  handleErrorResponse,
  handleHttpError,
} = require("../utils/handleError");

const createClient=async(req,res)=>{
    try {
        const {nombre,dni}=req.body;
        const client={
            nom_cli:nombre,
            dni_cli:dni
        }
        const clientQuery=await ClientServices.createClient(client);
        console.log(clientQuery)
        res.status(201).send({ok:true,msg:"CLIENT_CREATED",id:clientQuery.insertId});
    } catch (error) {
        console.log(error)
        handleHttpError(res,"Error en la consulta");
    }
}

const getClients=(req,res)=>{

}
const getClientByDni=async(req,res)=>{
    try {
        const {dni}=req.params;
        const client=await ClientServices.getOneClientByDni(dni);  
        console.log(client);
        res.status(200).send(client);
        return;
    } catch (error) {
        console.log(error)
        handleHttpError(res,"ERROR EN LA CONSULTA");
    }
}

module.exports={
    createClient,
    getClients,
    getClientByDni
}