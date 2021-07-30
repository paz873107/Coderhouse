export let productos=[
    {"title":"Remera Luna Love","price":700,"id":1},
    {"title":"Pollera Abyss","price":2250,"id":2},
    {"title":"Choker Black-Pink","price": 450,"id":3},
    {"title":"Bucaneras gatito","price": 600,"id":4}
  ];
  
export class Producto{
    constructor(title,price,id){
        this.title=title;
        this.price=price;
        this.id=id;
    }
  
    read(array) {
        return array;
    }
  
    write(array) {
        productos.push({
            id:productos.length+1,
            title:array.title,
            price:array.price,
        });
    }
  
    delete(id) {
        productos.splice(id-1,1);
    }
  }