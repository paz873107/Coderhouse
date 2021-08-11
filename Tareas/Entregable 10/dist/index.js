"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _products = _interopRequireDefault(require("./routes/products"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = 8080;
var app = (0, _express["default"])();

var layoutDirPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPth = _path["default"].resolve(__dirname, '../views/main.hbs'); // Setear el uso del engine de handlebars


app.set('view engine', 'hbs'); // Configuraciones de handlebars como la extension y los directorios del layout y default

app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutDirPath,
  defaultLayout: defaultLayerPth,
  extname: 'hbs'
})); // Indica que el servidor esta levantado y corriendo en puerto especificado

var server = app.listen(port, function () {
  console.log("Server running in port:  ".concat(port));
}); // Indicar un error que de el servidor.

server.on('error', function (err) {
  console.error("There was an error: ".concat(err));
});
app.set('json spaces', 2); // Hace una indentacion de la respuesta JSON en el navegador

app.use(_express["default"].json()); // Indica que el body viene como JSON

app.use(_express["default"].urlencoded({
  extended: true
})); // Indica que el body puede tener un informacion como no string
// Router de la API Productos

app.use('/api', _products["default"]);