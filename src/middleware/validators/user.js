const { check } = require("express-validator");
const { validateResultForgot,validateResultReset,validateResultUpdateUser } = require("../validatorUser");
const validateForgot = [
    check("email").exists().isEmail(),
    (req, res, next) => {
        validateResultForgot(req, res, next);
    },
  ];
  const validateReset = [
    check("email").exists().isEmail(),
    check("psw1","confirmpsw").exists().isString().isLength({min:6}),
    (req, res, next) => {
        validateResultReset(req, res, next);
    }
  ]
  const validateUpdateUser = [
    check("name","apellido1","apellido2").exists().isString(),
    check("nroDdi").exists().isLength({min:8,max:8}),
    check("email").exists().isEmail(),
    (req, res, next) => {
        validateResultUpdateUser(req, res, next);
    },
  ]
module.exports = {
    validateForgot,
    validateReset,
    validateUpdateUser
};