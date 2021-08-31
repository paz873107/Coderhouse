/*Creacion base de datos prueba*/

CREATE database prueba; 

/*Uso base de datos prueba*/ 
use prueba; 

/*Creacion base de tabla items*/

CREATE TABLE Items ( id INT auto_increment not NULL, nombre VARCHAR(30) not NULL, Categoria VARCHAR(15) NOT null, stock INT , PRIMARY KEY (id) ); /*Ingreso de datos*/ use prueba;

INSERT Items (nombre, Categoria, stock) values('Fideos', 'Harina', 20); use prueba;

INSERT Items (nombre, Categoria, stock) values('Leche', 'Lacteos', 30); use prueba;

INSERT Items (nombre, Categoria, stock) values('Crema', 'Lacteos', 15);

 /*Listar los elementos de la TABLE items*/ 
 
use prueba;

SELECT  *
FROM items 

/*Borrar el elemento con ID 1 de la tabla items*/ 
use prueba; 
delete
FROM items
WHERE id=1; 

/*Actualizar el stock del ID 2 a 45*/ 
use prueba; 
update items

SET stock=45
WHERE id=2 

/*Listar los elementos de la tabla Items*/ 
use prueba;

SELECT  *
FROM items