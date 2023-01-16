const { check } = require("express-validator");
const { validateResult } = require("../../utils/handleValidator");
const validateCreateOrder = [
  check("mod").exists().notEmpty().isNumeric().isIn(['1', '2']),
  check("mesas").exists().isArray(),
  check("mesas.*").optional({checkFalsy: true}).isNumeric(),
  check("detalle").exists().isArray().notEmpty(),
  check("detalle.*").exists().isObject(),
  check("detalle.*.id_prod").exists().notEmpty().isNumeric(),
  check("detalle.*.cantidad_det").exists().notEmpty().isNumeric(),
  check("detalle.*.descripcion_det").exists().optional({checkFalsy: true}).custom((value) => {
    return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports={
    validateCreateOrder
}