/**
 * TAREA 1 - ARRAYS
 * Esteban Saavedra Escobar
 *
 * Aqui fui probando una por una las funciones de arrays de JavaScript
 * y dejando escrito lo que fui entendiendo de cada una.
 * Para correrlo:  node arrays.js
 */

console.log("========== 1. CREAR ARRAYS ==========");

const frutas = ["manzana", "banano", "pera"];
console.log("Literal:", frutas);
// esta es la forma normal de crear un array, con corchetes y los valores adentro
// es la que mas se usa y la mas facil de leer

const vacio = new Array(3);
console.log("new Array(3):", vacio, "| longitud:", vacio.length);
// aqui aprendi algo raro: cuando le paso UN solo numero no crea un array con ese numero
// adentro, sino que crea un array de ese tamaño pero vacio
// por eso la longitud da 3 pero no hay nada adentro

console.log("Array.of(1,2,3):", Array.of(1, 2, 3));
// este soluciona justo el problema de arriba
// con Array.of() los valores si entran como valores, aunque le pase uno solo

console.log("Array.from('hola'):", Array.from("hola"));
// toma algo que se pueda recorrer (un texto por ejemplo) y me lo vuelve array
// el texto lo parte letra por letra

console.log("Array.from con función:", Array.from({ length: 5 }, (v, i) => i * 2));
// aqui le doy dos cosas: el tamaño que quiero y una funcion que decide que va en cada posicion
// la i es la posicion, entonces se van generando 0, 2, 4, 6, 8
// me parecio util para generar datos sin escribirlos a mano

console.log("¿frutas es array?:", Array.isArray(frutas));
console.log("¿'texto' es array?:", Array.isArray("texto"));
// simplemente pregunta si algo es un array o no y responde true o false
// lo probe con un texto para confirmar que si distingue

console.log("Cantidad de frutas:", frutas.length);
// length no es una funcion, es una propiedad, por eso no lleva parentesis
// me dice cuantos elementos hay


console.log("\n========== 2. AGREGAR Y QUITAR ELEMENTOS ==========");
// estas si modifican el array original, o sea despues de usarlas el array ya no es el mismo

const animales = ["gato", "perro"];

animales.push("loro");
console.log("push('loro'):", animales);
// mete un valor nuevo al final del array

const ultimo = animales.pop();
console.log("pop() devolvió:", ultimo, "| queda:", animales);
// quita el ultimo elemento, pero ademas me lo devuelve
// por eso lo guarde en una variable, para mostrar que si me entrega el valor que saco

animales.unshift("pez");
console.log("unshift('pez'):", animales);
// es como push pero al reves, mete el valor al inicio

const primero = animales.shift();
console.log("shift() devolvió:", primero, "| queda:", animales);
// y este es como pop pero al reves, quita el primero y me lo devuelve

const numeros = [1, 2, 3, 4, 5];
numeros.splice(1, 2);
console.log("splice(1,2):", numeros);
// este es el mas completo de todos porque sirve para varias cosas
// el primer numero es desde donde arranco a trabajar
// el segundo es cuantos elementos voy a borrar
// aqui borre 2 elementos empezando en la posicion 1

numeros.splice(1, 0, 99, 100);
console.log("splice(1,0,99,100):", numeros);
// mismo splice pero le puse 0 en el segundo, o sea no borres nada
// y lo que escribo despues se inserta en esa posicion
// asi es como se usa splice para meter cosas en la mitad del array


console.log("\n========== 3. LEER Y COPIAR (no modifican el original) ==========");

const letras = ["a", "b", "c", "d", "e"];

console.log("at(0):", letras.at(0));
console.log("at(-1) (el último):", letras.at(-1));
// at() es como usar corchetes pero con la ventaja de aceptar numeros negativos
// -1 es el ultimo, -2 el penultimo y asi
// antes tocaba escribir array[array.length - 1] que es mucho mas largo

console.log("slice(1,3):", letras.slice(1, 3));
console.log("Original intacto:", letras);
// me saca un pedazo del array pero como copia
// arranca en la posicion 1 y termina en la 3 SIN incluir la 3
// lo importante es que el original queda igualito, por eso lo imprimi despues

console.log("concat:", letras.concat(["f", "g"]));
// pega dos arrays y me devuelve uno nuevo con todo junto

console.log("join('-'):", letras.join("-"));
// deja de ser array y se vuelve un solo texto
// lo que le paso entre comillas es lo que va quedando entre cada elemento

console.log("toString():", letras.toString());
// hace casi lo mismo que join pero sin dejarme escoger el separador
// siempre usa coma


console.log("\n========== 4. BUSCAR ==========");

const notas = [3.0, 4.5, 2.8, 4.5, 5.0];

console.log("indexOf(4.5):", notas.indexOf(4.5));
// busca el valor exacto y me dice en que posicion esta
// puse 4.5 dos veces a proposito para ver cual me devuelve, y devuelve la primera

console.log("lastIndexOf(4.5):", notas.lastIndexOf(4.5));
// mismo valor pero ahora buscando desde el final
// por eso aqui si me da la segunda posicion donde esta el 4.5

console.log("includes(5.0):", notas.includes(5.0));
// no me interesa la posicion, solo saber si el valor existe o no

console.log("find(nota > 4):", notas.find(n => n > 4));
// aqui ya no busco un valor puntual sino una condicion
// me devuelve el primer numero que sea mayor a 4 y ahi se detiene

console.log("findIndex(nota > 4):", notas.findIndex(n => n > 4));
// la misma condicion que arriba pero me devuelve la posicion en vez del valor

console.log("findLast(nota > 4):", notas.findLast(n => n > 4));
// igual que find pero empezando por el final
// por eso da 5.0 y no 4.5

console.log("findLastIndex(nota > 4):", notas.findLastIndex(n => n > 4));
// combinacion de los dos anteriores: busca desde el final y me da la posicion


console.log("\n========== 5. RECORRER Y TRANSFORMAR ==========");

const precios = [1000, 2500, 800, 4200];

console.log("forEach:");
precios.forEach((precio, i) => console.log(`  Producto ${i}: $${precio}`));
// recorre el array y ejecuta lo que yo le diga con cada elemento
// no me devuelve nada nuevo, solo hace la accion
// aproveche el segundo parametro (i) que es la posicion, para numerar los productos

const conIva = precios.map(p => p * 1.19);
console.log("map (con IVA):", conIva);
// map si me devuelve un array nuevo del mismo tamaño
// cada precio pasa por la operacion y sale transformado
// aqui le sume el IVA a todos de una

console.log("filter (> 1000):", precios.filter(p => p > 1000));
// tambien devuelve array nuevo pero puede salir mas pequeño
// solo se quedan los que cumplan la condicion, los demas se descartan

console.log("some (> 4000):", precios.some(p => p > 4000));
// pregunta si al menos uno cumple, con uno solo ya responde true

console.log("every (> 500):", precios.every(p => p > 500));
// este es mas exigente, tienen que cumplir TODOS para que responda true
// si uno solo falla ya da false

const total = precios.reduce((acumulado, actual) => acumulado + actual, 0);
console.log("reduce (suma total):", total);
// este fue el que mas me costo entender
// no devuelve array, devuelve un solo valor final
// "acumulado" es lo que llevo sumado y "actual" el precio que esta leyendo
// el 0 del final es con cuanto arranca el acumulado
// entonces va sumando de a uno hasta que queda el total

const alReves = ["a", "b", "c"].reduceRight((acc, act) => acc + act);
console.log("reduceRight:", alReves);
// lo mismo pero recorriendo de derecha a izquierda
// por eso el texto queda al reves


console.log("\n========== 6. ORDENAR E INVERTIR ==========");
// estas dos si cambian el array original

const nombres = ["Carlos", "Ana", "Beatriz"];
nombres.sort();
console.log("sort() alfabético:", nombres);
// con textos funciona bien de una, los organiza alfabeticamente

const edades = [30, 5, 100, 25];
edades.sort((a, b) => a - b);
console.log("sort ascendente:", edades);
// con numeros toca tener cuidado porque sort por dentro los trata como texto
// sin la funcion (a, b) el 100 quedaria antes del 25 porque compara caracter por caracter
// la resta a - b es la que le dice cual va primero

edades.sort((a, b) => b - a);
console.log("sort descendente:", edades);
// solo invirtiendo la resta ya me ordena de mayor a menor

const orden = [1, 2, 3];
orden.reverse();
console.log("reverse():", orden);
// no ordena nada, simplemente voltea el array como esta


console.log("\n========== 7. RELLENAR Y COPIAR INTERNAMENTE ==========");

console.log("fill(0):", new Array(5).fill(0));
// aqui aproveche el new Array(5) que crea espacios vacios y los llene con ceros
// asi es como se inicializa un array en ceros

console.log("fill('x', 1, 3):", [1, 2, 3, 4, 5].fill("x", 1, 3));
// tambien puedo rellenar solo un pedazo
// arranca en la posicion 1 y termina en la 3 sin incluirla, o sea solo cambia 2 posiciones

console.log("copyWithin(0,3):", [1, 2, 3, 4, 5].copyWithin(0, 3));
// este es raro y casi no lo he visto usado
// copia una parte del mismo array y la pega en otra posicion del mismo array
// el tamaño no cambia, solo se sobreescriben valores


console.log("\n========== 8. ARRAYS DENTRO DE ARRAYS ==========");

const anidado = [1, [2, 3], [4, [5, 6]]];

console.log("flat():", anidado.flat());
// saca los arrays de adentro pero solo un nivel
// por eso el [5, 6] sigue quedando metido

console.log("flat(2):", anidado.flat(2));
// aqui le dije que bajara dos niveles y ahi si quedo todo plano

console.log("flat(Infinity):", anidado.flat(Infinity));
// con Infinity no importa cuantos niveles haya, los aplana todos
// util cuando no se que tan anidado viene el array

console.log("flatMap:", [1, 2, 3].flatMap(n => [n, n * 10]));
// es un map y un flat en un solo paso
// cada numero genera un array pequeño y al final todo queda en una sola fila


console.log("\n========== 9. ITERADORES ==========");

const colores = ["rojo", "verde", "azul"];

console.log("keys():", [...colores.keys()]);
// me devuelve las posiciones, no los valores
// tuve que ponerle los tres puntos porque si no me imprime "Object [Array Iterator]"

console.log("values():", [...colores.values()]);
// este es el contrario, solo los valores
// se ve igual al array original porque no transforma nada

console.log("entries():");
for (const [i, color] of colores.entries()) {
  console.log(`  ${i} -> ${color}`);
}
// junta los dos anteriores y me entrega pareja de posicion y valor
// lo recorri con un for para que se viera mas claro


console.log("\n========== 10. VERSIONES QUE NO MODIFICAN EL ORIGINAL ==========");
// son las versiones nuevas y "seguras" de sort, reverse y splice

const base = [3, 1, 2];

console.log("toSorted():", base.toSorted((a, b) => a - b));
// ordena igual que sort pero devolviendo un array nuevo

console.log("toReversed():", base.toReversed());
// mismo reverse pero sin dañar el original

console.log("toSpliced(1,1):", base.toSpliced(1, 1));
// splice de toda la vida pero devolviendo copia

console.log("with(0, 99):", base.with(0, 99));
// cambia el valor de una sola posicion y me devuelve el array nuevo
// seria como hacer base[0] = 99 pero sin tocar el original

console.log("El original nunca cambió:", base);
// esta linea es la prueba de que ninguno de los cuatro modifico el array base


console.log("\n========== 11. EXTRAS ÚTILES ==========");

const a = [1, 2];
const b = [3, 4];
console.log("Spread para unir:", [...a, ...b]);
// los tres puntos desarman el array y sueltan los valores por separado
// asi los puedo meter dentro de otro array

console.log("Spread para copiar:", [...a]);
// tambien sirve para copiar un array
// esto es importante porque si hago const c = a los dos apuntan al mismo array

const [x, y] = [10, 20];
console.log("Destructuring: x =", x, ", y =", y);
// en vez de sacar los valores uno por uno con corchetes, los reparto directo en variables

const conRepetidos = [1, 2, 2, 3, 3, 3];
console.log("Sin duplicados:", [...new Set(conRepetidos)]);
// Set no deja valores repetidos, entonces al meter el array ahi se limpian solos
// despues con los tres puntos lo devuelvo a array

console.log("\n===== FIN DE LA TAREA =====");
