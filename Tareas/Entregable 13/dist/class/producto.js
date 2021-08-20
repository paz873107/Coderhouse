"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _app = require("../modules/app.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Producto = function Producto(title, price, thumbnail, id) {
  _classCallCheck(this, Producto);

  this.title = title;
  this.price = parseFloat(price);
  this.thumbnail = thumbnail;
  this.id = id;
};

exports["default"] = Producto;