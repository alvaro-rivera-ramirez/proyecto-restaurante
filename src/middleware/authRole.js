const isAdmin = (req, res, next) => {
    if(!req.role){
        res.status(403).send({msg:"El usuario no tiene rol."})
        return;
    }
    if(req.role!=="Administrador"){
        res.status(403).send({msg:"El usuario no tiene autorizacion"})
        return;
    }
    next();
};

const isWaiter = (req, res, next) => {

};

const isChef = (req, res, next) => {

};

const isCashier = (req, res, next) => {

};

module.exports={
    isAdmin,
    isCashier,
    isChef,
    isWaiter
}