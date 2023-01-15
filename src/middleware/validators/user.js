const { check } = require("express-validator");
const { validateResult } = require("../validatorUser");
const validateForgot = [
    check("email").exists().isEmail(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];
  const validateReset = [
    check("email").exists().isEmail(),
    check("psw1","confirmpsw").exists().isPassportNumber(),
    (req, res, next) => {
      validateResult(req, res, next);
    }
  ]
module.exports = {
    validateForgot,
    validateReset
};