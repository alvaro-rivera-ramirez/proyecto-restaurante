const { check } = require("express-validator");
const { validateResult } = require("../../utils/handleValidator");
const validateDataCreate = [
  check("numero_mesa", "Mesa Invalida").exists().trim().notEmpty().isNumeric(),
  check("id_piso", "Piso invalido").exists().trim().notEmpty().isNumeric(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateDataUpdate = [
  check("id").exists().isNumeric(),
  check("numero_mesa", "Mesa Invalida").exists().trim().notEmpty().isNumeric(),
  check("id_piso", "Piso inválido").exists().trim().notEmpty().isNumeric(),
  check("id_emesa", "Estado inválido").exists().trim().notEmpty().isNumeric(),
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