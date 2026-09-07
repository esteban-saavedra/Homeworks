/**
 * Esteban Saavedra
 *
 * Aqui investigue las diferencias entre los dos tipos de funciones
 * y al final hice el ejercicio de par o impar en ambas versiones.
 * Para correrlo:  node funciones.js
 */

console.log("========== PARTE 1: DIFERENCIAS ==========");

console.log("\n--- 1. LA FORMA DE ESCRIBIRLAS ---");

function saludarTradicional(nombre) {
  return "Hola " + nombre;
}
// la funcion de toda la vida: lleva la palabra function, un nombre y un return

const saludarFlecha = (nombre) => "Hola " + nombre;
// la misma funcion pero en flecha
// no lleva la palabra function, se guarda en una variable y la flecha => reemplaza todo lo demas
// cuando el cuerpo es una sola linea no necesito ni llaves ni return, lo devuelve solo

console.log(saludarTradicional("Esteban"));
console.log(saludarFlecha("Esteban"));
// las dos hacen exactamente lo mismo, se ve en el resultado

const sumar = (a, b) => {
  const resultado = a + b;
  return resultado;
};
// cuando la flecha necesita mas de una linea si toca ponerle llaves
// y ahi si vuelve a ser obligatorio el return
console.log("Suma con flecha de varias lineas:", sumar(3, 4));

const alCuadrado = n => n * n;
// dato curioso: si solo recibe un parametro me puedo ahorrar los parentesis
console.log("Al cuadrado:", alCuadrado(5));


console.log("\n--- 2. EL HOISTING (cual se puede usar antes de escribirla) ---");

console.log("Llamando la tradicional antes de declararla:", antesDeExistir());

function antesDeExistir() {
  return "si funciono";
}
// esto es lo que llaman hoisting: JavaScript lee todo el archivo primero
// y las funciones tradicionales las "sube" al inicio, por eso puedo llamarla arriba

// const noExisteTodavia = () => "prueba";
// console.log(noExisteTodavia());
// si hago lo mismo con una flecha me revienta con un error
// lo deje comentado para que el codigo no se caiga, pero esa es la diferencia
// las flechas viven dentro de una variable y las variables no se pueden usar antes de crearse


console.log("\n--- 3. EL THIS (esta es la diferencia mas importante) ---");

const equipoTradicional = {
  nombre: "Los Arrays",
  mostrar: function () {
    return "Equipo: " + this.nombre;
  }
};
// aqui use una funcion tradicional como metodo del objeto
// el this apunta al objeto que la esta llamando, o sea equipoTradicional
console.log(equipoTradicional.mostrar());

const equipoFlecha = {
  nombre: "Los Arrays",
  mostrar: () => {
    return "Equipo: " + this.nombre;
  }
};
// el mismo objeto pero con flecha, y aqui sale undefined
// la flecha NO tiene su propio this, se roba el del lugar donde fue escrita
// como la escribi por fuera de todo, ese this no es el objeto y por eso no encuentra el nombre
console.log(equipoFlecha.mostrar());

// esta parte fue la que mas me costo entender, asi que lo resumo asi:
// funcion tradicional -> el this depende de QUIEN la llama
// funcion flecha -> el this depende de DONDE la escribi
// por eso las flechas no sirven como metodos de objetos, pero si sirven muy bien
// para funciones cortas dentro de un map, filter o forEach


console.log("\n--- 4. EL OBJETO ARGUMENTS ---");

function contarTradicional() {
  return "Recibi " + arguments.length + " argumentos";
}
// las tradicionales guardan solitas todo lo que les mandan en algo llamado arguments
// aunque yo no haya declarado ningun parametro
console.log(contarTradicional(1, 2, 3, 4));

const contarFlecha = (...args) => "Recibi " + args.length + " argumentos";
// las flechas no tienen arguments, si lo uso me da error
// la solucion es el rest operator (...) que hace lo mismo pero mas claro
console.log(contarFlecha(1, 2, 3, 4));


console.log("\n--- 5. SE PUEDEN USAR CON NEW? ---");

function PersonaTradicional(nombre) {
  this.nombre = nombre;
}
const p1 = new PersonaTradicional("Ana");
console.log("Con funcion tradicional si se puede:", p1.nombre);
// las tradicionales sirven como constructoras, o sea puedo crear objetos con new

// const PersonaFlecha = (nombre) => { this.nombre = nombre; };
// const p2 = new PersonaFlecha("Ana");
// esto tira error diciendo que no es constructora
// lo deje comentado para no romper el archivo
console.log("Con funcion flecha da error, no son constructoras");


console.log("\n--- 6. DONDE SE VE MEJOR CADA UNA ---");

const numeros = [1, 2, 3, 4, 5];

console.log("Tradicional dentro de map:", numeros.map(function (n) { return n * 2; }));
console.log("Flecha dentro de map:", numeros.map(n => n * 2));
// las dos dan el mismo resultado pero la flecha se lee muchisimo mas corta
// por eso en los metodos de arrays casi siempre se usan flechas


console.log("\n========== PARTE 2: PAR O IMPAR ==========");

// VERSION TRADICIONAL
function esParTradicional(numero) {
  if (numero % 2 === 0) {
    console.log("El numero " + numero + " es PAR");
  } else {
    console.log("El numero " + numero + " es IMPAR");
  }
}
// el operador % me da el residuo de la division
// si divido entre 2 y el residuo es 0 significa que se dividio exacto, o sea es par
// si sobra algo (residuo 1) entonces es impar

// VERSION FLECHA
const esParFlecha = (numero) => {
  if (numero % 2 === 0) {
    console.log("El numero " + numero + " es PAR");
  } else {
    console.log("El numero " + numero + " es IMPAR");
  }
};
// exactamente la misma logica, solo cambia como esta escrita la funcion

console.log("\nProbando la tradicional:");
esParTradicional(4);
esParTradicional(7);
esParTradicional(0);

console.log("\nProbando la flecha:");
esParFlecha(10);
esParFlecha(15);
esParFlecha(-3);
// probe tambien con 0 y con negativos para ver si aguantaba
// el 0 lo cuenta como par y con negativos tambien funciona bien

console.log("\n===== FIN DEL CHALLENGE =====");
