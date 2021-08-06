"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * DATOS A MANIPULAR
 */
var mascotas = [];

var router = _express["default"].Router();

router.get('/listar', function (req, res) {
  res.json({
    mascotas: mascotas
  });
});
router.post('/guardar', function (req, res) {
  var body = req.body;
  console.log(body);
  var nuevaMascota = {
    nombre: body.nombre,
    raza: body.raza,
    edad: body.edad
  };
  mascotas.push(nuevaMascota);
  res.json({
    nuevaMascota: nuevaMascota
  });
});
var _default = router;
exports["default"] = _default;