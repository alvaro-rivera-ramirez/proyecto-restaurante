const { check } = require("express-validator");
const { validateResult } = require("../../utils/handleValidator");
const validateCreateClient = [
  check("dni").exists().notEmpty().isNumeric().isLength({ min: 8, max:8 }),
  check("nombre").exists().notEmpty().custom((value) => {
    return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]{5,30}$/);
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateSearchClient=[
    check("dni").exists().notEmpty().isNumeric().isLength({ min: 8, max:8 }),
];
module.exports={
    validateCreateClient,
    validateSearchClient
}