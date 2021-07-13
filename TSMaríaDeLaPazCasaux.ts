
const operacion = (numeroUno:number, numeroDos:number, tipoOperacion:string) => {
    return new Promise((resolve, reject) => {
        import('./Clases').then((module) => {
            if (tipoOperacion == 'suma') resolve(module.suma(numeroUno, numeroDos));
            else resolve(module.resta(numeroUno, numeroDos));
        });
    });
}

const operaciones = () => {
    operacion(3, 5, 'suma').then((result) => {
        console.log(result);
    });
    operacion(3, 5, 'resta').then((result) => {
        console.log(result);
    });
};

operaciones();
   

   
