  // CREAR UN NUEVO DECK O PILON DE BARAJAS
  // creamos una arrow function que creara todas las cartas Clubs osea treboles, a partir del 2
  // porque el 1 es As, en el for le deciomos creame la variable let i = 2 mientras i sea <= a 10 
  // incrementale 1 + a i, luego creamos otro for en donde vamos a crear una variable let tipo
  // en cada vuelta o recorrido en tipos de esta manera creara el numero en el primero for
  // y en el segundo for le agregara la letra por ejemplo creo el 2 en el primer for luego en 
  //el segundo for agarro el 2 hizo otro recorrido en tipos y con .push creo 2C, 2D, 2H, 2S con (i + tipo)
  // y asi sucesivamente lo hace con todos los numero del 2 al 10
  // Luego para hacer las cartas especiales creamos otro for donde recorremos tipo of tipos y dentro
  // al obtener el especial que es A hacemos otro for donde creamos esp of especiales creando AC
  // y asi sucesivamente agregando con push esp + tipp en una concatenacion
  import _ from 'underscore';
  
  export const crearDeck = (tiposDeCarta, tiposEspeciales) => {

    let deck = [];

    for( let i = 2; i <= 10; i ++ ) {
        for ( let tipo of tiposDeCarta ) {
            deck.push( i + tipo );
        }
    }

    for ( let tipo of tiposDeCarta ) {
        for ( let esp of tiposEspeciales ) {
            deck.push( esp + tipo);
        }
    }

    //console.log( deck ); imprime deck ordenado ya no hace falta
    // para barajar o desordenar las cartas o elementos debo utilizar una libreria underscore
    // y buscar a _-shuffle, descargar la UMD Production Version que pesa 7.48KB copio todo el 
    // codigo, voy y creo un nuevo archivo llamado underscore-min.js y ahi pego el codigo de underscore
    // guardo, luego en index.js creo un script src''justo antes de juego.js e importo el archivo
    // undescore-min.js y guardo.
    // llamo a la variable que voy a desordenar que es deck = _.shuffle(deck) significa desordena
    // ese array
    
    deck = _.shuffle( deck );
    return deck;
}