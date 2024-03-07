import _ from 'underscore';
import { crearDeck } from './usecases/create-deck'

// usaremos el modo estricto 'use strict' mediante una function anonima
//para que no puedan alterar nuestro codigo

(() => {
  'use strict'

      // creando las cartas en el arreglo, para ello creamos un arreglo vacio que es deck, luego

  let deck    = []; // ESTA VARIABE ESTA AQUI PARA QUE SEA GLOBAL Y PODER USARLA DENTRO DE FUNCIONES Y FUERA DE FUNCIONES
  const tipos = ['C', 'D', 'H', 'S'],
   especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugador     = 0,
      puntosComputadora = 0;

  //Referencias del HTML estas referencias tienen que conectarse con los eventos
  const btnPedir   = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo   = document.querySelector('#btnNuevo');



  

  const divCartasJugador     = document.querySelector('#jugador-cartas'),
        divCartasComputadora = document.querySelector('#computadora-cartas'),
        puntosHTML           = document.querySelectorAll('small');


  document.addEventListener('DOMContentLoaded', function capturarNombre() {
      const nombreJugador = prompt('Ingrese su nombre: ');

      if ( nombreJugador !== null && nombreJugador !== "" ) {
          document.getElementById('nombreJugadorTitulo').innerText = nombreJugador + ' vs Computadora';
      } else {
          alert('Debes ingresar un nombre valido!')
      }
  });


  deck = crearDeck(tipos, especiales);


  // FUNCION PEDIR CARTA SUPER ALEATORIA YA QUE NO se sabe de donde lo eliminara
  //const pedirCarta = () => {
  //    const obtenerIndiceAleatorio = Math.floor(Math.random() * deck.length);
  //    console.log(deck[obtenerIndiceAleatorio]);
  //    const carta =  deck.splice(obtenerIndiceAleatorio, 1) [0];
  //    console.log(carta);
  //    console.log(deck);
  //    return carta;
  //}

  // OTRA MANERA DE HACER FUNCION PARA PEDIR CARTA PERO EXTRAYENDO EL ULTIMO ELEMENTO DEL ARRAY CON .POP()
  const pedirCarta = () => {
      // condicion si no hay mas cartas no deberia seguir el juego, Throw arroja mensaje de error y sale del programa
      if ( deck.length === 0 ) {
          throw 'No hay mas cartas en el deck'
      }
      return deck.pop();
  }

  //pedirCarta();

  // AGREGAR VALOR A LAS CARTAS
  const valorCarta = (carta) => {
      const valor = carta.substring(0, carta.length - 1); // valor es = a sustraccion de desde laposicion 0 hasta el penultimo indice de ese elemento
      // saber si es un numero o no con metodo isNaN() esto sig is Not a Number
      return ( isNaN( valor ) ) ? // si la siguiente const que es valor no es un numero (? entonces
             ( valor === 'A' ) ? 11 : 10 // valor es === 'A' ?entonces valdra 11 :sino valdra 10
              : valor * 1; // :lo anterior * 1 para que el reslt sea num
  }

  btnNuevo.addEventListener('click', () => {
      location.reload();
  });

  btnDetener.addEventListener('click', () => {
      btnPedir.disabled = true;
      btnDetener.disabled = true;

      turnoComputadora( puntosJugador );
  });

  // Eventos: variableOReferencia.addEventListener('evento deseado click o double click', () => { creas tu variable = llamar la function();}
  btnPedir.addEventListener('click', () => {
      const carta = pedirCarta();
      puntosJugador = puntosJugador + valorCarta( carta );
      puntosHTML[0].innerText = puntosJugador;

      // buscar imagen y agregarle la extension del archivo que quieres mostrar ejemplo .png
      const imgCarta = document.createElement('img');
      imgCarta.src = `assets/cartas/${ carta }.png`;
      imgCarta.classList.add('carta');
      divCartasJugador.append( imgCarta );

      setTimeout(() => {
      if ( puntosJugador > 21 ) {
          btnPedir.disabled = true;  // desabilitar boton
          btnDetener.disabled = true;
          alert('Jugador Perdio');

          turnoComputadora( puntosJugador );

      } else if ( puntosJugador === 21 ) {
          alert('Ganaste');
          btnDetener.disabled = true;
      }
  }, 50); 

  });


  // TURNO DE LA COMPUTADORA

  const turnoComputadora = ( puntosMinimos ) => {
  do {
      const carta = pedirCarta();
          puntosComputadora = puntosComputadora + valorCarta( carta );
          puntosHTML[1].innerText = puntosComputadora;

          const imgCarta = document.createElement('img');
          imgCarta.src = `assets/cartas/${ carta }.png`;
          imgCarta.classList.add('carta');
          divCartasComputadora.append( imgCarta );

          if ( puntosMinimos > 21 ) {
              break;
          }

  } while(  ( puntosComputadora < puntosMinimos ) && ( puntosMinimos <= 21 )  );
  // retrasar el tiempo de una funcion function
  setTimeout( () => {
      if ( puntosComputadora === puntosMinimos ) {
          alert('Nadie gana! ');
      } else if ( puntosJugador > 21 ) {
          alert ( 'Computadora gana!' );
      } else if ( puntosComputadora > 21 ) {
          setTimeout ( () => {
              alert('Jugador gana!');
          }, 50 );
      } else if ( puntosComputadora === 21 ) {
          alert('Computadora gana!')
      } else if ( puntosJugador === 21 ) {
          alert('Jugador gana!');
      } else if ( ( puntosComputadora < 21) && (puntosComputadora > puntosJugador) ) {
          alert('Computadora gana!')
      } else if ( ( puntosJugador < 21) && (puntosComputadora < puntosJugador) ) {
          alert('Jugador gana!');
      }
  }, 50 ); 

  }



}) ();




