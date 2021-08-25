"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioServer = exports.router = void 0;
var express_1 = require("express");
var socket_io_1 = require("socket.io");
var productclass_1 = __importDefault(require("../services/productclass"));
var messageclass_1 = __importDefault(require("../services/messageclass"));
exports.router = express_1.Router();
var products = new productclass_1.default();
var messages = new messageclass_1.default();
// Endpoint GET para listar todos los productos
exports.router.get('/productos/listar', function (req, res) {
    var getProducts = products.getProducts();
    getProducts.length !== 0
        ? res.json({ products: getProducts })
        : res.status(404).json({ error: 'No hay productos cargados' });
});
// Endpoint GET para listar todos los messages
exports.router.get('/mensajes/listar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var listMessages, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, messages.getMessages()];
            case 1:
                listMessages = _a.sent();
                listMessages.length !== 0
                    ? res.json({ messages: listMessages })
                    : res.status(404).json({ error: 'No hay mensajes cargados' });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Endpoint GET para pedir un producto especifico por ID
exports.router.get('/productos/listar/:id', function (req, res) {
    var specificId = req.params.id;
    var getProducts = products.getProducts();
    var product = getProducts.find(function (product) { return product.id == specificId; });
    product
        ? res.json({ product: product })
        : res.status(404).json({ error: 'Producto no encontrado' });
});
// Endpoint POST para agregar un producto
exports.router.post('/productos/guardar', function (req, res) {
    var body = req.body;
    var product = products.addProduct(body.title, body.price, body.thumbnail);
    res.json({ product: product });
});
// Endpoint POST para agregar un producto
exports.router.post('/mensajes/guardar', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                body = req.body;
                return [4 /*yield*/, messages.newMessage(body.email, body.date, body.time, body.message)];
            case 1:
                _a.sent();
                res.json({ mensaje: body });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Endpoint PUT para actualizar un producto por ID
exports.router.put('/productos/actualizar/:id', function (req, res) {
    var specificId = req.params.id;
    var body = req.body;
    var updatedProduct = products.updateProduct(specificId, body.title, body.price, body.thumbnail);
    updatedProduct === -1
        ? res.status(404).json({ error: 'Producto no encontrado' })
        : res.status(201).json({ product: updatedProduct });
});
// Endpoint DELETE para borrar un producto por ID
exports.router.delete('/productos/borrar/:id', function (req, res) {
    var specificId = req.params.id;
    var deletedProduct = products.deleteProduct(specificId);
    deletedProduct === -1
        ? res.status(404).json({ error: 'Producto no encontrado o ya eliminado' })
        : res.json({ deletedProduct: deletedProduct });
});
// Socket Server
var ioServer = function (server) {
    var io = new socket_io_1.Server(server);
    io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
        var getMessages_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Client Connected');
                    socket.on('addProduct', function (data) {
                        products.addProduct(data.title, data.price, data.thumbnail);
                        io.emit('products', products.getProducts());
                    });
                    socket.emit('products', products.getProducts());
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, messages.getMessages()];
                case 2:
                    getMessages_1 = _a.sent();
                    socket.on('sendMessage', function (message) { return __awaiter(void 0, void 0, void 0, function () {
                        var error_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, messages.newMessage(message.email, message.date, message.time, message.message)];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_4 = _a.sent();
                                    console.log(error_4);
                                    return [3 /*break*/, 3];
                                case 3:
                                    io.emit('messages', getMessages_1);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    socket.emit('messages', getMessages_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    return io;
};
exports.ioServer = ioServer;