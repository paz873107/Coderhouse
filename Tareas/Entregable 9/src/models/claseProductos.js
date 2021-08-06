export default class Productos {
    constructor() {
        this.elementos = [];
    }

    //funcion para leer mis productos
    async leer() {
    
        try {
            return this.elementos
        } catch (error) {
                console.log('No hay productos en el listado');
            }
    }


    //funcion para agregar productos
    async guardar(title, price, thumbnail) {

        try {

            if (typeof title !== 'string') throw new Error('Titulo tiene que ser string');
            if (typeof price !== 'number') throw new Error('Price tiene que ser un nro');
            if (typeof thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 

            let elemento = {
                title: title,
                price: price,
                thumbnail: thumbnail,
                id: this.elementos.length + 1,
            }

            this.elementos.push(elemento);
            return elemento;
  
        } catch (error) {
                  console.log('ERROR: No se pudo agregar un producto. ' + error.message);
            }
      
    }

  
    async leerUno(id) {
        
        try {
            const producto = this.elementos.find((aProduct) => aProduct.id == id);
            return producto;
        } catch (error) {
                console.log('Producto no encontrado');
            }

    }

    async actualizar(id,title=null, price=null, thumbnail=null) {
        
        try {
            if (typeof title !== 'string') throw new Error('Titulo tiene que ser string');
            if (typeof price !== 'number') throw new Error('Price tiene que ser un nro');
            if (typeof thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 

            const index = this.elementos.map((aProduct) => aProduct.id).indexOf(id);
            if (index == -1) {
                return res.status(404).json({
                  msg: 'Product not found',
                });
            }
            
            this.elementos[index].title = title;
            this.elementos[index].price = price;
            this.elementos[index].thumbnail = thumbnail;

            return this.elementos[index];
        } catch (error) {
                console.log('Producto no encontrado');
            }

    }

    async borrarUno(id) {
        
        try {
            const idBuscado = Number(id);
            const productoEliminado= this.elementos.find((aProduct) => aProduct.id == idBuscado);
            this.elementos = this.elementos.filter((aProduct) => aProduct.id !== idBuscado);
            
            return productoEliminado;
            } catch (error) {
                console.log(`Producto no encontrado`);
            }
        
    }
}