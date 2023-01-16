const isAdmin = (req, res, next) => {
    if(!req.role){
        res.status(403).send({msg:"El usuario no tiene rol."})
        return;
    }
    if(req.role!=="Administrador"){
        res.status(403).send({msg:"El usuario no tiene autorización"})
        return;
    }
    next();
};

const isWaiter = (req, res, next) => {
    if(!req.role){
        res.status(403).send({msg:"El usuario no tiene rol."})
        return;
    }
    if(req.role!=="Mesero" && req.role!=="Cajero"){
        res.status(403).send({msg:"El usuario no tiene autorización"})
        return;
    }
    next();
};

const isChef = (req, res, next) => {
    if(!req.role){
        res.status(403).send({msg:"El usuario no tiene rol."})
        return;
    }
    if(req.role!=="Cocinero"){
        res.status(403).send({msg:"El usuario no tiene autorización"})
        return;
    }
    next();
};

const isCashier = (req, res, next) => {
    if(!req.role){
        res.status(403).send({msg:"El usuario no tiene rol."})
        return;
    }
    if(req.role!=="Cajero"){
        res.status(403).send({msg:"El usuario no tiene autorización"})
        return;
    }
    next();
};

module.exports={
    isAdmin,
    isCashier,
    isChef,
    isWaiter
}