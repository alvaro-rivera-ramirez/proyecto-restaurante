const { check } = require("express-validator");
const { errors } = require("jose");
const { validateResult } = require("../../utils/handleValidator");
const validateDataCreate = [
    check("nomProd", "Producto invalido").exists().trim().notEmpty().custom((value) => {
        return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
      }),
      check("descripcionProd", "Producto invalido").exists().trim().notEmpty().custom((value) => {
        return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
      }),
      check("precio_uProd", "Producto invalido").exists().notEmpty().isDecimal(),
      (req, res, next) => {
        validateResult(req, res, next);
      },
];

const validateDataUpdate = [
    check("nomProd", "Producto invalido").exists().trim().notEmpty().custom((value) => {
        return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
      }),
      check("descripcionProd", "Producto invalido").exists().trim().notEmpty().custom((value) => {
        return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
      }),
      check("precio_uProd", "Producto invalido").exists().notEmpty().isDecimal(),
      (req, res, next) => {
        validateResult(req, res, next);
      },
];

const validateId = [
  check("id").exists().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateId,
  validateDataCreate,
  validateDataUpdate,
};
