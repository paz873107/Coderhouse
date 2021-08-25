"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var allroutes_1 = require("./routes/allroutes");
var port = process.env.PORT || 8080;
var app = express_1.default();
var server = new http.Server(app);
allroutes_1.ioServer(server);
// Indica que el servidor esta levantado y corriendo en puerto especificado
server.listen(port, function () {
    console.log("Server running in port:  " + port);
});
// Indicar un error que de el servidor.
server.on('error', function (err) {
    console.error("There was an error: " + err);
});
app.set('json spaces', 2); // Hace una indentacion de la respuesta JSON en el navegador
app.use(express_1.default.json()); // Indica que el body viene como JSON
app.use(express_1.default.urlencoded({ extended: true })); // Indica que el body puede tener un informacion como no string
// Mensaje de bienvenida
app.get('/', function (req, res) {
    res.json({
        message: 'Hi, you are connected to the api',
    });
});
// Router de la API Productos
app.use('/api', allroutes_1.router);