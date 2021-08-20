"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.lastID = exports.dbIDs = exports.productos = void 0;

var _app = require("./app.js");

/**
 * DATOS A MANIPULAR
 */
var productos = []; //Array de productos

exports.productos = productos;
var dbIDs = []; //Array de los IDs de los productos

exports.dbIDs = dbIDs;
var lastID = {
  lastID: 0
}; //Ultimo ID de producto utilizado

exports.lastID = lastID;
var messages = []; //Array de todos los mensajes del chat
//Se verifica si existen mensajes guardados

exports.messages = messages;

function checkMessagesOld() {
  var messageOld = JSON.parse((0, _app.leerMessages)());

  if (messageOld !== -1) {
    messages.push.apply(messages, messageOld);
  }
} //Se inicializan los mensajes


checkMessagesOld();