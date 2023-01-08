const {Router}=require("express");
const statsController=require('../controllers/stats.controller');
const {validationToken}=require('../middleware/validationToken')
const statsRouter=Router();

statsRouter.get('/pedMes/:dato',statsController.pedMes);
statsRouter.get('/catMes/:dato',statsController.catMes);
statsRouter.get('/pedDia/:dato',statsController.pedDia);
statsRouter.get('/catDia/:dato',statsController.catDia);
statsRouter.get('/pedBimes/:dato',statsController.pedBimes);
statsRouter.get('/pedBiDia/:dato',statsController.pedBiDia);

module.exports=statsRouter;