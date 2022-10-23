const express = require('express');
const app = express();

app.use(require('./empleado/empleado_sesion'));
module.exports = app;