const { check } = require("express-validator");
const { validateResult } = require("../validatorAuth");
const validateUser = [
    check("name","apellido1","apellido2").exists().isString(),
    check("nroDdi").exists().isLength({min:8,max:8}),
    check("email").exists().isEmail(),
    check("pass").exists().isString().isLength({min:6}),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ]
module.exports = {
    validateUser
};