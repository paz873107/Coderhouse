import express,{response} from "express";
import {productos} from "./class.js";
//import {Producto} from "./class";

// Inicializo el servidor

const app=express();
const port=8030;
const server=app.listen(port,()=>console.log("Servidor escuchando en el puerto",port));

server.on("error",(err)=>{
  console.log("Server Error",err);
});

// Rutas

app.get("/",(req,res)=>{
  res.json(
    `Navega por las distintas rutas:
        /api/productos/lista=> devuelve un array con todos los productos
        /api/productos/lista/:id=> devuelve producto segun ID
        /api/productos/agregar/=> agrega un producto`
    );
});

app.get("/api/productos/lista",(req, res)=>{
  if (productos.length==[]){
    return res.status(404).json({
      Error:"No hay productos en la lista",
    });
  }
  res.json(productos);
});

app.get("/api/productos/lista/:id",(req,res)=>{
  const idSearch=req.params.id;
  const product=productos.find((idProd)=>idProd.id==idSearch);

  if (!product){
    return res.status(404).json({
      Error:"El producto ingresado no existe",
    });
  }
  res.json({
    data:product,
  });
});

app.use(express.json({type:'*/*'}));
app.use(express.urlencoded({extended:true}));
app.post("/api/productos/agregar",(req,res)=>{

const body=req.body;
console.log(req.body);

if (body=={}){
    return res.status(400).json({
        Error:"Error al agregar producto",
    });
}

const newProduct={
    title:body.title,
    price:body.price,
    id:productos.length+1
}

productos.push(newProduct)

    res.status(201).json({
        msg:"El producto se añadió exitosamente",
        data:newProduct
    })
});