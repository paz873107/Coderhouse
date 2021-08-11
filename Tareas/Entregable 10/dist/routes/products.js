"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productclass = _interopRequireDefault(require("../productclass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var products = new _productclass["default"](); // Endpoint GET de la pagina principal de la API

router.get('/', function (req, res) {
  res.render('main', {
    layout: 'index'
  });
}); // Endpoint GET de la pagina para ver la lista de productos

router.get('/productos/vista', function (req, res) {
  res.render('listproducts', {
    layout: 'index',
    products: products.getProducts(),
    productExists: products.getProducts().length === 0 ? false : true
  });
}); // Endpoint GET de la pagina para agregar productos

router.get('/productos/agregar', function (req, res) {
  res.render('addproducts', {
    layout: 'index'
  });
}); // Endpoint GET para listar todos los productos

router.get('/productos/listar', function (req, res) {
  var getProducts = products.getProducts();
  getProducts.length !== 0 ? res.json({
    products: getProducts
  }) : res.status(404).json({
    error: 'No hay productos cargados'
  });
}); // Endpoint GET para pedir un producto especifico por ID

router.get('/productos/listar/:id', function (req, res) {
  var specificId = req.params.id;
  var getProducts = products.getProducts();
  var product = getProducts.find(function (product) {
    return product.id == specificId;
  });
  product ? res.json({
    product: product
  }) : res.status(404).json({
    error: 'Producto no encontrado'
  });
}); // Endpoint POST para agregar un producto

router.post('/productos/guardar', function (req, res) {
  var body = req.body;
  products.addProduct(body.title, body.price, body.thumbnail);
  res.redirect('/api/productos/agregar');
}); // Endpoint PUT para actualizar un producto por ID

router.put('/productos/actualizar/:id', function (req, res) {
  var specificId = req.params.id;
  var body = req.body;
  var updatedProduct = products.updateProduct(specificId, body.title, body.price, body.thumbnail);
  updatedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado'
  }) : res.status(201).json({
    product: updatedProduct
  });
}); // Endpoint DELETE para borrar un producto por ID

router["delete"]('/productos/borrar/:id', function (req, res) {
  var specificId = req.params.id;
  var deletedProduct = products.deleteProduct(specificId);
  deletedProduct === -1 ? res.status(404).json({
    error: 'Producto no encontrado o ya eliminado'
  }) : res.status(200).json({
    deletedProduct: deletedProduct
  });
});
var _default = router;
exports["default"] = _default;