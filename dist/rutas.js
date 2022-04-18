"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controlador_1 = require("./controlador/controlador");
const router = (0, express_1.Router)();
router.get('/test', (requ, resp) => resp.send("HOLA MUNDO"));
router.get('/empleados', controlador_1.getEmpleados);
router.get('/empleados/:legajo', controlador_1.getEmpleadosXID); //ese ":legajo" debo recuperarlo en el controlador con un req.param.legajo
router.post('/crearEmpleado', controlador_1.crearEmpleado); //acá hago un insert, entonces uso post
router.put('/actualizarEmpleado/:legajo', controlador_1.actualizarEmpleado);
router.delete('/eliminarEmpleado/:legajo', controlador_1.eliminarEmpleado);
exports.default = router;
