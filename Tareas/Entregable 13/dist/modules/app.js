"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.leerMessages = leerMessages;
exports.guardarMessages = guardarMessages;
exports.objToJSON = exports.contenido = exports.random = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fs = require('fs');

var publicPathFolder = _path["default"].resolve(__dirname, './../../public/');

var publicPathFileName = _path["default"].resolve(__dirname, './../../public/messages.txt'); //Función para generar un numero aleatorio partiendo de un intervalo.


var random = function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}; //Generando el contenido de la Item.


exports.random = random;

var contenido = function contenido() {
  var obj = {
    title: "Producto ".concat(Math.floor(random(1, 10))),
    price: "".concat(random(0.0, 9999.99).toFixed(2)),
    thumbnail: "https://picsum.photos/id/".concat(Math.floor(random(1, 200)), "/200/200"),
    id: ""
  };
  return obj;
}; //stringify el contenido para el Item.


exports.contenido = contenido;

var objToJSON = function objToJSON(contenido) {
  return JSON.stringify(contenido, undefined, 2);
}; //Esta funcion se encarga de leer y devolver los mensajes de existir el archivo de mensajes.


exports.objToJSON = objToJSON;

function leerMessages() {
  var filenames = fs.readdirSync(publicPathFolder);
  var found = filenames.find(function (element) {
    return 'messages.txt' === element;
  });

  if (found === 'messages.txt') {
    var data = fs.readFileSync(publicPathFileName, 'utf-8');
    return data;
  } else {
    return -1;
  }
} // Esta función guarda el array de mensajes en un archivo con formato JSON


function guardarMessages(messages) {
  fs.writeFileSync(publicPathFileName, objToJSON(messages), 'utf-8');
}