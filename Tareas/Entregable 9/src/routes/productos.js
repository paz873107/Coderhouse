import express from 'express';
import Productos from './../models/claseProductos.js';

const productos = new Productos ();

const router = express.Router();

router.get('/listar',[], async (req, res) => {
  
    let data=await productos.leer();
    
    if (data.length==0) {
       data= {error: 'no hay productos cargados'}
    }
    return res.json({
      data,
    });
  });

router.get('/listar/:id', [], async (req, res) => {
    console.log(req.params);
    const idBuscado = parseInt( req.params.id);
    let producto = await productos.leerUno(idBuscado);
    
    //En caso de no encontrar el producto, respondemos con codigo 404 para indicar el error 
    if (!producto) {
      return res.status(404).json({
        error : 'Producto no encontrado',
      });
    }
    return res.json({
      data: producto,
    });
  });
  
  
  
router.post('/guardar',[], async (req, res) => {
    const {title, price, thumbnail} = req.body;
        
    const nuevoProducto = await productos.guardar(title, Number(price), thumbnail);
   
    return res.status(201).json({
      data: nuevoProducto,
    });
  });

router.put('/actualizar/:id',[], async (req, res) => {
    const {title, price, thumbnail} = req.body;
    const {id} = req.params;
        
    const nuevoProducto = await productos.actualizar(Number(id),title, Number(price), thumbnail);
   
    return res.status(201).json({
      data: nuevoProducto,
    });
  });

router.delete('/borrar/:id', [], async (req, res) => {
    console.log(req.params);
    const idBuscado = parseInt( req.params.id);
    let producto = await productos.borrarUno(idBuscado);
    
    //En caso de no encontrar el producto, respondemos con codigo 404 para indicar el error 
    if (!producto) {
      return res.status(404).json({
        error : 'Producto no encontrado',
      });
    }
    return res.json({
      data: producto,
    });
  });

  export default router;