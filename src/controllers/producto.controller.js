const ProductoServices=require("../services/productoServices");
const {
    handleErrorResponse,
    handleHttpError,
  } = require("../utils/handleError");

const getProducto = async (req, res) => {
    try {
        const producto=await ProductoServices.getProducto();
        return res.status(201).send(producto);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
};

const getOneProducto = async(req, res) => {
    const {
        params: {id},
    }=req;
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    
    try {
        const producto=await ProductoServices.getOneProducto(id);
        return res.status(201).send(producto);
    } catch (error) {
        handleErrorResponse(res, "PRODUCT_INVALID", 401);
        console.log(error)
    }
};

const createProducto = async (req, res) => {
    try {
        const { idCat, nomProd, descripcionProd, precio_uProd } = req.body;

        console.log(req.body)
        console.log(req.file)

        const newProducto = {
            id_categoria: idCat,
            nom_prod: nomProd,
            descripcion_prod: descripcionProd,
            precio_u_prod: precio_uProd,
            imagen_prod: req.file.filename,
          };
          
        const producto = await ProductoServices.createProducto(newProducto);
        return res.status(201).send(producto);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
};

const updateProducto = async (req, res) => {
    const {idCat, nomProd, descripcionProd, precio_uProd } = req.body;

    console.log(req.body)
    console.log(req.file)

    const {params:{id}} = req;
    const newProducto = {
        id_categoria: idCat,
        nom_prod: nomProd,
        descripcion_prod: descripcionProd,
        precio_u_prod: precio_uProd,
        //imagen_prod: req.file.filename,
    };
    if (!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    const producto = await ProductoServices.updateProducto(id, newProducto);
    return res.status(201).send(producto);
};

const deleteProducto = async (req, res) => {
    const {
        params: {id},
    }=req;
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    await ProductoServices.deleteProducto(id);
    return res.status(204).send({status: "OK"});
};

module.exports={
    getProducto,
    getOneProducto,
    createProducto,
    updateProducto,
    deleteProducto
}