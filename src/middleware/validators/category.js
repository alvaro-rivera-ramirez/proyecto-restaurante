const { check } = require("express-validator");
const { validateResult } = require("../../utils/handleValidator");
const validateDataCreate = [
  check("nom_categoria", "Categoría invalida").exists().notEmpty().custom((value) => {
    return value.match(/^[A-Za-z ]+$/);
  }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateDataUpdate = [
  check("id").exists().isNumeric(),
  check("nom_categoria", "Categoría invalida").exists().notEmpty().custom((value) => {
    return value.match(/^[A-Za-z ]+$/);
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
