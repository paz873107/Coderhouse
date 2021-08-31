"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var productroute_1 = __importDefault(require("./routes/productroute"));
var cartroute_1 = __importDefault(require("./routes/cartroute"));
// Inicializacion Servidor
var app = (0, express_1.default)();
var port = 8080 || process.env.PORT;
var server = app.listen(port, function () { return console.log('Servidor escuchando en puerto', port); });
server.on('error', function (err) {
    console.log('Server Error', err);
});
// Routes
// Carpeta Public
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rutas
app.use("/product", productroute_1.default);
app.use("/cart", cartroute_1.default);
// Pagina Principal
app.get('/', function (req, res) {
    res.sendFile(__dirname + "../public/index.html");
});
