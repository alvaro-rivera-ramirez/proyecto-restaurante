const { check } = require("express-validator");
const { validateResult } = require("../../utils/handleValidator");
const validateDataCreate = [
  check("nom_categoria", "Categoría invalida").exists().trim().notEmpty().custom((value) => {
    return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateDataUpdate = [
  check("id").exists().isNumeric(),
  check("nom_categoria", "Categoría invalida").exists().trim().notEmpty().custom((value) => {
    return value.match(/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/);
  }),
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
