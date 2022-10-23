const { Router } = require("express");
const router = Router();

const {
    EMPLEADO_INTERFAZ,
} = require('../../controllers/empleado/empleado_sesion');

router.route('/')
    .get((req, res) => res.redirect('empleado/'));

router.route('/empleado')
    .get(EMPLEADO_INTERFAZ);


module.exports = router;