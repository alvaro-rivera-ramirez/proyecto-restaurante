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
        console.log("revisando: ",req.file.filename)
        //console.log(req.producto.idCat)
        const { idCat,name, descripcion, precioU} = req.body;
        //console.log("producto: ",req.body.archivo)
        //const {archivo}=req.file;
        //console.log(detalle);
        let imagenURL;
        if(req.file){
            
            imagenURL=`http://localhost:3000/public/img/productos/${req.file.filename}`;
            console.log("url: ",imagenURL);
        }else{
            imagenURL= null;
        }
        const newProducto = {
            id_categoria: idCat,
            nom_prod: name,
            descripcion_prod: descripcion,
            precio_u_prod: precioU,
            imagen_prod: imagenURL,
          };
          
          console.log("pasando else:",newProducto);
        const producto=await ProductoServices.createProducto(newProducto);
        return res.status(201).send(producto);
    } catch (error) {
        console.log(error);
        return res.status(401);
    }
};
const updateProducto = async (req, res) => {
    const {idCat,name, descripcion, precioU, imagenURL } = req.body;
    const {params:{id}} = req;
    const newProducto = {
        id_categoria: idCat,
        nom_prod: name,
        descripcion_prod: descripcion,
        precio_u_prod: precioU,
        imagen_prod: imagenURL,
      };
    if(!id){
        handleErrorResponse(res,"CAMPOS VACIOS",401);
        return;
    }
    const producto=await ProductoServices.updateProducto(id, newProducto);
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
