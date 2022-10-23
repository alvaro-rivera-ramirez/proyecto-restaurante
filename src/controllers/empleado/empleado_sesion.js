const controllers = {};

controllers.EMPLEADO_INTERFAZ = (req, res) => {
    res.render('empleado/empleado_sesion',{
        session: req.session.acceso
    });
};

module.exports = controllers;