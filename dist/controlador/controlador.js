"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarEmpleado = exports.actualizarEmpleado = exports.crearEmpleado = exports.getEmpleadosXID = exports.getEmpleados = void 0;
const mysqldb_1 = require("../mysqldb");
const getEmpleados = (req, res) => new Promise((resolve, reject) => {
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err); //como respuesta le mando el error en formato json, se muestra en el servidor
            return;
        }
        console.log('MySQL Connection: ', connection.threadId);
        connection.query('SELECT * FROM empleado limit 10', (err, results) => {
            if (err)
                console.error(err);
            //console.log('User Query Results: ', results);
            res.send(results); //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
        });
    });
});
exports.getEmpleados = getEmpleados;
const getEmpleadosXID = (req, res) => new Promise((resolve, reject) => {
    const legajo = parseInt(req.params.legajo); //me traigo "legajo" de rutas.ts 
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('SELECT * FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
            if (err)
                console.error(err);
            res.send(results);
        });
    });
});
exports.getEmpleadosXID = getEmpleadosXID;
const crearEmpleado = (req, res) => new Promise((resolve, reject) => {
    const { legajo, apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body; //recupero los valores del cuerpo de la llamada
    var values = [legajo, apellido, nombre, dni, sector, fecha_ingreso, activo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'INSERT INTO empleado(legajo, apellido, nombre, dni, sector, fecha_ingreso, activo) VALUES (?,?, ?, ?, ?, ?,?)';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al tratar de insertar" });
                }
                else {
                    res.json({ message: "Empleado Insertado con exito" });
                    //alert("carga satisfactoria de empleado"); no se puede colocar acá: [nodemon] app crashed - waiting for file changes before starting... 
                }
            });
        }
    });
});
exports.crearEmpleado = crearEmpleado;
const actualizarEmpleado = (req, res) => new Promise((resolve, reject) => {
    const { apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;
    const legajo = parseInt(req.params.legajo);
    var values = [apellido, nombre, dni, sector, fecha_ingreso, activo, legajo];
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        else {
            let sql = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fecha_ingreso=?, activo=? WHERE legajo=?';
            connection.query(sql, values, (err, results) => {
                if (err) {
                    console.error(err);
                    res.json({ message: "Error al actualizar " + err });
                }
                else {
                    res.json({ message: "Empleado Actualizado con exito" });
                }
            });
        }
    });
});
exports.actualizarEmpleado = actualizarEmpleado;
const eliminarEmpleado = (req, res) => new Promise((resolve, reject) => {
    const legajo = parseInt(req.params.legajo);
    mysqldb_1.cxMysql.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            res.send(err);
            return;
        }
        connection.query('DELETE FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
            if (err) {
                console.error(err);
                res.json({ message: "Error al tratar de Eliminar" });
            }
            else {
                res.json({ message: "Empleado Eliminado con exito" });
            }
        });
    });
});
exports.eliminarEmpleado = eliminarEmpleado;
