const PisosServices=require("../services/pisosServices");
const {
    handleErrorResponse,
    handleHttpError,
  } = require("../utils/handleError");
  
const getPisos = async (req, res) => {
    try {
        const piso=await PisosServices.getPisos();
        return res.status(201).send(piso);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
};
const getOnePisos = async(req, res) => {
    const {params: {id},}=req;
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    
    try {
        const piso=await PisosServices.getOnePisos(id);
        return res.status(201).send(piso);
    } catch (error) {
        handleErrorResponse(res, "PISO_INVALID", 401);
        console.log(error)
    }
};
const createPisos = async (req, res) => {
    try {
        const {name} = req.body;
        const newPiso = {
//<<<<<<< HEAD
            nom_piso: name,
//=======
//            numero_piso: name,
//>>>>>>> main
          };
        const piso=await PisosServices.createPisos(newPiso);
        return res.status(201).send(piso);
    } catch (error) {
        return res.status(401);
    }
};
const updatePisos= async (req, res) => {
    const {name} = req.body;
    const {params:{id}} = req;
    const newPiso = {
        nom_piso: name,
      };
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    const piso=await PisosServices.updatePisos(id, newPiso);
    return res.status(201).send(piso);
};
const deletePisos = async (req, res) => {
    const {
        params: {id},
    }=req;
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    await PisosServices.deletePisos(id);
    return res.status(204).send({status: "OK"});
};

module.exports={
    getPisos,
    getOnePisos,
    createPisos,
    updatePisos,
    deletePisos
}
