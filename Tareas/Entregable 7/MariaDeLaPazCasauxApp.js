import 'regenerator-runtime/runtime.js';
import express from 'express';
import fs from 'fs/promises';

const productos=[
	{
    "title": "Remera Luna Love",
    "price": 700,
    "thumbnail": "https://bit.ly/3eWLZQV",
    "id": 1
  },
  {
    "title": "Pollera Abyss",
    "price": 2250,
    "thumbnail": "https://bit.ly/3zNMnJN",
    "id": 2
  },
  {
    "title": "Choker Black-Pink",
    "price": 450,
    "thumbnail": "https://bit.ly/3BDkd5R",
    "id": 3
  },
  {
    "title": "Bucaneras gatito",
    "price": 600,
    "thumbnail": "https://bit.ly/3eV1HfD",
    "id": 4
  }
];

const port=8030;
const app=express();

const server=app.listen(port,()=>{
	console.log(`Server corriendo en el puerto ${port}`);
});

server.on('error',(err)=>{
	console.log(`Sucedió el siguiente error: ${err}`);
});

let visitas1 = 0;
let visitas2 = 0;

app.get('/',(req, res)=>{
	visitas1++;
	res.send(`Bienvenido! Navegá a traves de las rutas '/items' '/item-random' '/visitas'`);
});

app.set('json spaces',2);

app.get('/items',(req, res) => {
	visitas1++;
	res.json({
		items: productos,
		cantidad: productos.length,
	});
});

app.get('/item-random',async (req, res) => {
	try {
		visitas2++;
		const readedFile=await fs.readFile('./Productos.txt','utf-8');
		const jsonParse= JSON.parse(readedFile);
		const randomProduct=
			jsonParse[Math.floor(Math.random()*jsonParse.length)];
		res.json({
			item:randomProduct,
		});
	} catch (error) {
		console.log(error);
	}
});

app.get('/visitas',(req, res)=>{
	res.json({
		visitas:{
			items:visitas1,
			item:visitas2,
		},
	});
});