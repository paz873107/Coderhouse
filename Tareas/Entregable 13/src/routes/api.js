import express from 'express';
import Producto from './../class/producto.js';
import { contenido } from '../modules/app.js';
import { productos, dbIDs, lastID } from '../modules/data.js';

const router = express.Router();

//Creando algunos Productos para pruebas
//Comentar para verificar el error de no existen productos.
for (let id = 1; id <= 4; id++) {
  const objDatos = contenido();
  const objProducto = new Producto(
    objDatos.title,
    objDatos.price,
    objDatos.thumbnail,
    id
  );
  productos.push(objProducto);
  dbIDs.push(id);
  lastID.lastID = id;
}

/**
 * DEFINICION RUTAS BASICAS
 */

//Ruta para Listar todos los producto existentes
router.get('/productos/listar', (req, res) => {
  if (productos.length < 1) {
    return res.status(400).json({
      error: 'No hay productos cargados',
    });
  }

  res.json({
    productos,
  });
});

//Ruta para listar un producto especifico por su id
router.get('/productos/listar/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    return res.status(400).json({
      error: 'Producto no encontrado',
    });
  }

  const product = productos[indexID];
  res.json({
    product,
  });
});

//Ruta para guardar un producto nuevo si se cumplen los parámetros necesarios.
router.post('/guardar', (req, res) => {
  const body = req.body;
  const msgErrorParametros = 'Parámetros no validos';
  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (body.title === undefined) {
    errorGuardar('title no definido');
  }

  if (body.price === undefined) {
    errorGuardar('Precio no definido');
  }

  if (isNaN(parseFloat(body.price))) {
    errorGuardar('Precio letra');
  }

  if (body.thumbnail === undefined) {
    errorGuardar('No imagen');
  }

  lastID.lastID = lastID.lastID + 1; // Se incrementa el lastID.lastID por que se va a guarda un nuevo valor.

  const objProducto = new Producto(
    body.title,
    body.price,
    body.thumbnail,
    lastID.lastID
  );
  productos.push(objProducto);
  dbIDs.push(lastID.lastID);

  //Validando si el guarda es usado desde el form o via json/api
  if (body.form === 'true') {
    //Deprecated el form no se usa desde un submit, se reemplaza por websocket
    res.redirect(301, '/');
  } else {
    res.json({
      objProducto,
    });
  }
});

//Ruta para actualizar un producto si se cumplen los parámetros necesarios.
router.put('/productos/actualizar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const body = req.body;
  const msgErrorID = 'Producto no encontrado';
  const msgErrorParametros = 'Parámetros no validos';
  let flagUpdate = true;

  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  const indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagUpdate = false;
    errorGuardar(msgErrorID);
  }

  if (body.title === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.price === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (isNaN(parseFloat(body.price))) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (body.thumbnail === undefined) {
    flagUpdate = false;
    errorGuardar(msgErrorParametros);
  }

  if (flagUpdate) {
    productos[indexID].title = body.title;
    productos[indexID].price = body.price;
    productos[indexID].thumbnail = body.thumbnail;
    const objProducto = productos[indexID];

    res.json({
      objProducto,
    });
  }
});

//Ruta encargada de eliminar un producto
router.delete('/productos/borrar/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const msgErrorID = 'Producto no encontrado';
  let flagDelete = true;

  const errorGuardar = (msg) => {
    return res.status(400).json({
      error: msg,
    });
  };

  if (id < dbIDs[0] || id > dbIDs[dbIDs.length - 1]) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  let indexID = dbIDs.findIndex((ID) => ID === id);
  if (indexID === -1) {
    flagDelete = false;
    errorGuardar(msgErrorID);
  }

  if (flagDelete) {
    const product = productos[indexID];
    productos.splice(indexID, 1);
    dbIDs.splice(indexID, 1);

    res.json({
      product,
    });
  }
});

export default router;