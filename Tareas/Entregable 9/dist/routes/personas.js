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
var personas = [];

var router = _express["default"].Router();

router.get('/listar', function (req, res) {
  res.json({
    personas: personas
  });
});
router.post('/guardar', function (req, res) {
  var body = req.body;
  var nuevaPersona = {
    nombre: body.nombre,
    apellido: body.apellido,
    edad: body.edad
  };
  personas.push(nuevaPersona);
  res.json({
    nuevaPersona: nuevaPersona
  });
});
var _default = router;
exports["default"] = _default;