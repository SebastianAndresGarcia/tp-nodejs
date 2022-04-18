import { Request, Response } from "express";
import { cxMysql } from '../mysqldb';

export const getEmpleados = (req: Request, res: Response) => new Promise((resolve, reject) => {
  cxMysql.getConnection((err, connection) => { //si falla la conexion, entra al if(err)
    if (err) {
      console.error(err);
      res.send(err); //como respuesta le mando el error en formato json, se muestra en el servidor
      return;
    }
    console.log('MySQL Connection: ', connection.threadId);
    connection.query('SELECT * FROM empleado limit 10', (err, results) => { //ejecuta la consulta
      if (err) console.error(err);
      //console.log('User Query Results: ', results);
      res.send(results)  //devuelve como resultado un json porque yo así lo especifiqué en la línea 5 de index.ts
    });

  });
});

export const getEmpleadosXID = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const legajo = parseInt(req.params.legajo); //me traigo "legajo" de rutas.ts 
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    connection.query('SELECT * FROM empleado WHERE legajo = ?', [legajo], (err, results) => { //esta es una funcion anonima no se le pone nombre, van los paréntesis(err,results) seguido del contenido
      if (err) console.error(err);
      res.send(results) 
    });
  });
});

export const crearEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {

  const { legajo, apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body; //recupero los valores del cuerpo de la llamada
  var values = [legajo, apellido, nombre, dni, sector, fecha_ingreso, activo];
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    else {
      let sql: string = 'INSERT INTO empleado(legajo, apellido, nombre, dni, sector, fecha_ingreso, activo) VALUES (?,?, ?, ?, ?, ?,?)';
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          res.json({ message: "Error al tratar de insertar" });
          
        } else {
          res.json({ message: "Empleado Insertado con exito" });
          //alert("carga satisfactoria de empleado"); no se puede colocar acá: [nodemon] app crashed - waiting for file changes before starting... 
        }
      });
    }
  });
});

export const actualizarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const {apellido, nombre, dni, sector, fecha_ingreso, activo } = req.body;
  const legajo = parseInt(req.params.legajo);
  var values = [apellido, nombre, dni, sector, fecha_ingreso, activo, legajo];
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    else {
      let sql: string = 'UPDATE empleado SET apellido=?, nombre=?, dni=?, sector=?, fecha_ingreso=?, activo=? WHERE legajo=?';
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.error(err);
          res.json({ message: "Error al actualizar " + err })
        } else {
          res.json({ message: "Empleado Actualizado con exito" })
        }

      });
    }
  });
});

export const eliminarEmpleado = (req: Request, res: Response) => new Promise((resolve, reject) => {
  const legajo = parseInt(req.params.legajo);
  cxMysql.getConnection((err, connection) => {
    if (err) {
      console.error(err);
      res.send(err);
      return;
    }
    connection.query('DELETE FROM empleado WHERE legajo = ?', [legajo], (err, results) => {
      if (err) {
        console.error(err);
        res.json({ message: "Error al tratar de Eliminar" })
      } else {
        res.json({ message: "Empleado Eliminado con exito" })
      }

    });
  });
});