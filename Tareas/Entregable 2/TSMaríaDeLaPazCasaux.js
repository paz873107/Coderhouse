var operacion = function (numeroUno, numeroDos, tipoOperacion) {
    return new Promise(function (resolve, reject) {
        Promise.resolve().then(function () { return require('./Clases'); }).then(function (module) {
            if (tipoOperacion == 'suma')
                resolve(module.suma(numeroUno, numeroDos));
            else
                resolve(module.resta(numeroUno, numeroDos));
        });
    });
};
var operaciones = function () {
    operacion(3, 5, 'suma').then(function (result) {
        console.log(result);
    });
    operacion(3, 5, 'resta').then(function (result) {
        console.log(result);
    });
};
operaciones();
