import express from 'express';
import Product from '../productclass';

const router = express.Router();
const products = new Product();

// Endpoint GET de la pagina principal de la API
router.get('/', (req, res) => {
	res.render('main');
});

// Endpoint GET de la pagina para ver la lista de productos
router.get('/productos/vista', (req, res) => {
	res.render('listproducts', {
		products: products.getProducts(),
		productExists: products.getProducts().length === 0 ? false : true,
	});
});

// Endpoint GET de la pagina para agregar productos
router.get('/productos/agregar', (req, res) => {
	res.render('addproducts');
});

// Endpoint GET para listar todos los productos
router.get('/productos/listar', (req, res) => {
	const getProducts = products.getProducts();
	getProducts.length !== 0
		? res.json({ products: getProducts })
		: res.status(404).json({ error: 'No hay productos cargados' });
});

// Endpoint GET para pedir un producto especifico por ID
router.get('/productos/listar/:id', (req, res) => {
	const specificId = req.params.id;
	const getProducts = products.getProducts();
	const product = getProducts.find((product) => product.id == specificId);
	product
		? res.json({ product })
		: res.status(404).json({ error: 'Producto no encontrado' });
});

// Endpoint POST para agregar un producto
router.post('/productos/guardar', (req, res) => {
	const body = req.body;
	products.addProduct(body.title, body.price, body.thumbnail);
	res.redirect('/api/productos/agregar');
});

// Endpoint PUT para actualizar un producto por ID
router.put('/productos/actualizar/:id', (req, res) => {
	const specificId = req.params.id;
	const body = req.body;
	const updatedProduct = products.updateProduct(
		specificId,
		body.title,
		body.price,
		body.thumbnail
	);
	updatedProduct === -1
		? res.status(404).json({ error: 'Producto no encontrado' })
		: res.status(201).json({ product: updatedProduct });
});

// Endpoint DELETE para borrar un producto por ID
router.delete('/productos/borrar/:id', (req, res) => {
	const specificId = req.params.id;
	const deletedProduct = products.deleteProduct(specificId);
	deletedProduct === -1
		? res.status(404).json({ error: 'Producto no encontrado o ya eliminado' })
		: res.status(200).json({ deletedProduct });
});

export default router;