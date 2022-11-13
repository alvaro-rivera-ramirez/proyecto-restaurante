/* const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,cd){
        cb(null,path.join(__dirname,'../public/img/productos'))
    },
    filename: function(req,dile,cb){
        cb(null,`image${Date.now()}.${file.mimetype.split('/')[1]}`)
    }
})

module.exports = storage */