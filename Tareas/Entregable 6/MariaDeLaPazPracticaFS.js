const fs = require('fs/promises');

class Archivo {
	constructor(filename) {
		this.filename = filename;
		this.content = [];
	}

	async newProduct(title, price, thumbnail) {
		try {
			this.content.push({
				title: title,
				price: price,
				thumbnail: thumbnail,
				id: this.content.length + 1,
			});
			await fs.writeFile(this.filename, JSON.stringify(this.content, null, 2));
			console.log(`Producto ${title} agregado a ${this.filename}`);
		} catch (error) {
			console.log('No se pudo agregar un producto');
		}
	}

	async readFile() {
		try {
			const readedFile = await fs.readFile(this.filename, 'utf-8');
			console.log(readedFile)
		} catch (error) {
			console.log('No se pudo leer el archivo');
		}
	}

	async deleteFile() {
		try {
			await fs.unlink(this.filename);
			console.log(`Archivo ${this.filename} borrado`);
		} catch (error) {
			console.log('No se pudo borrar archivo');
		}
	}
} 

const main= async()=>{
	try{
		const test = await new Archivo('Productos.txt');
		await test.newProduct('Remera Luna Love', 700.00, 'https://bit.ly/3eWLZQV');
		await test.newProduct('Pollera Abyss', 2250.00, 'https://bit.ly/3zNMnJN');
		await test.newProduct('Choker Black-Pink', 450.00, 'https://bit.ly/3BDkd5R');
		await test.newProduct('Bucaneras gatito', 600.00, 'https://bit.ly/3eV1HfD');
		
		console.log(await test.readFile());

		//El Archivo se elimina luego de 4 segundos.
		setTimeout(() => {
		test.deleteFile();
		}, 4000);
  
	}catch{
		(err)=> {
			console.log("Error de main", err);
		};
	  }
  }
  
  main();

