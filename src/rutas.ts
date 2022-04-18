import { Router } from "express";
import { getEmpleados, getEmpleadosXID,crearEmpleado,actualizarEmpleado,eliminarEmpleado} from "./controlador/controlador";

const router = Router();

router.get('/test', (requ,resp) => resp.send("HOLA MUNDO"));
router.get('/empleados', getEmpleados);
router.get('/empleados/:legajo',getEmpleadosXID); //ese ":legajo" debo recuperarlo en el controlador con un req.param.legajo
router.post('/crearEmpleado', crearEmpleado); //acá hago un insert, entonces uso post
router.put('/actualizarEmpleado/:legajo', actualizarEmpleado);
router.delete('/eliminarEmpleado/:legajo', eliminarEmpleado);

export default router;
