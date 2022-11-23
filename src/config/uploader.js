const express=require('express');
const cors=require ('cors');
const multer =require('multer');
const sharp=require('sharp');
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'src/public/img/productos')
    },
    filename:(req,file,cb)=>{
        const ext=file.originalname.split('.').pop();
        cb(null,`${Date.now()}.${ext}`)
    }
})
const upload =multer({storage})

module.exports = upload;
