"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rutas_1 = __importDefault(require("./rutas"));
const app = (0, express_1.default)(); //creo una instancia de express para poder levantar el servidor
app.use(express_1.default.json()); //transforma los datos de objetos a json, las consultas realizadas a la bd en el controlador las pasará a json
app.use(express_1.default.urlencoded({ extended: false })); //transforma los datos de un formulario html en json
app.use(rutas_1.default); //agrego las rutas asociadas al servidor
app.use(express_1.default.static("public"));
app.listen(3000, () => {
    console.log("Servidor en puerto 3000", 3000);
});
