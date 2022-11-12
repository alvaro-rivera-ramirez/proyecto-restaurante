const con = require("../config/bd");

const getPisos = async() => {
    const piso=await con.query("SELECT * FROM piso");
    if(!piso) throw new Error();
    return piso;
};
const getOnePisos = async(id) => {
    const piso=await con.query("SELECT * FROM piso WHERE id_piso=?",[id]);
    if(!piso) throw new Error();
    return piso;
};
const createPisos = async(piso) => {
    try {
        const newPiso=await con.query("INSERT INTO piso SET ?",[piso]);
        return newPiso;
    } catch (error) {
        throw new Error();
    }

};
const updatePisos = async(id,piso) => {
    try {
        const newPiso=await con.query("UPDATE piso SET ? WHERE id_piso=? ",[piso,id]);
        return newPiso;
    } catch (error) {
        throw new Error();
    }

};
const deletePisos = async(id) => {
    try {
        await con.query("DELETE FROM piso WHERE id_piso=?",[id]);
    } catch (error) {
        throw new Error();
    }
};

module.exports={
    getPisos,
    getOnePisos,
    createPisos,
    updatePisos,
    deletePisos
};
