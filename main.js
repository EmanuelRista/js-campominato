//Voglio creare il pulsante "START" legato ad un evento click per iniziare il gioco.
//Tutto sarà inserito all'interno di una funzione
document.getElementById("button-start").addEventListener("click", function(){ //se l'utente clicca su start allora viene attivata la funzione

//Imposto il numero minimo e il numero massimo
var ROUNDS = 84;//il massimo dovrebbe essere 84 (100-16)
var NUM_MIN = 1;//il numero minimo
var NUM_MAX = 100;//il numero massimo


//Imposto le mine (numeri vietati)
var MAX_MINES = 16;//quante sono le mine
var MIN_MINESNUM = 1;//il numero minimo a cui una mina si può "attaccare"
var MAX_MINESNUM = 100;//il numero massimo a cui una mina si può "attaccare"
var mines = [];
var minesTmp = 0;

//Voglio permettere all'utente di selezionare la difficoltà tramite un elemento select
var levelChoiceInHTML = parseInt(document.getElementById("levelChoice").value);

console.log(levelChoiceInHTML)
switch(levelChoiceInHTML) { // Switch serve per attivare un'azione a seconda della condizione https://www.w3schools.com/js/js_switch.asp
  case 1://caso 1 difficoltà facile
    MAX_MINESNUM = 100;//il numero massimo a cui una mina si può "attaccare"
    NUM_MAX = 100;//il numero massimo consentito nel gioco (l'utente può scegliere da 1 fino a 100)
    break;//fine del caso 1
  case 2://caso 2 difficoltà normale
    MAX_MINESNUM = 80;//il numero massimo a cui una mina si può "attaccare"
    NUM_MAX = 80;//il numero massimo consentito nel gioco (l'utente può scegliere da 1 fino a 80)
    break;//fine del caso 2
  case 3://caso 3 difficoltà difficile
    MAX_MINESNUM = 50;//il numero massimo a cui una mina si può "attaccare"
    NUM_MAX = 50;//il numero massimo consentito nel gioco (l'utente può scegliere da 1 fino a 80)
    break;//fine del caso 3
}

//Voglio generare i 16 numeri random vietati (mine)
while (mines.length < MAX_MINES){//le mine devono essere 16
  minesTmp = Math.floor(Math.random() * (MAX_MINESNUM - MIN_MINESNUM + 1)) + MIN_MINESNUM;
  if(!checkArray(minesTmp,mines)){
    mines.push(minesTmp);
  }
}

//Fisso variabili
var userChoice = "";//variabile fissata prompt di scelta da parte dell'utente
var userChoiceMade = [];//variabile fissata, ciò che l'utente ha scelto
var hasWon = false;//l'utente ha vinto = falso
var selectedMines = false;//l'utente ha trovato numeri vietati (mine) = falso
var step = 0;//conta i "rounds"

//logica generale
while(!hasWon && !selectedMines){//agisci così finchè non è vero che l'utente ha perso (HasWon=falso, come impostato di default) e non è vero che l'utente ha selezionato numeri vietati
  if(userChoiceMade.length == ROUNDS){//se la scelta dell'utente è avvenuta 84 volte senza incappare in una mina (sic! Plausibilità)
    hasWon = true;//l'utente ha vinto
  }else{//diversamente agisci in questa maniera:
    userChoice = parseInt(prompt("Scegli il tuo numero da " + NUM_MIN + " a " + NUM_MAX + " smidollato!"));//continua a chiedergli di inserire il numero
    alert("Hai inserito il numero " + userChoice);
    step++//e avanza di un round
    if(userChoice > NUM_MAX){//se l'utente ha scelto un numero maggiore del range
      alert("Sveglia razza di rammollito! Il numero massimo che puoi inserire è " + NUM_MAX)//allora sgridalo e chiedigli di inserirlo giusto
    }else if(userChoice < NUM_MIN){//se invece l'utente ha scelto un numero minore dell'opzione minima (che è sempre uno)
      alert("Concentrati sfigato! il numero minimo che puoi inserire è 1");//allora sgridalo e digli di rimediare
    }else{//diversamente (entra in campo la funzione di check dell'array)
      if(!checkArray(userChoice,userChoiceMade)){//se entra in campo la funzione di check dell'array
        if(checkArray(userChoice,mines)){//se il numero scelto dall'utente corrisponde alla mina
          alert("Il numero " + userChoice + " è una mina!");
          alert("BOOM! Hai perso, sei una fighetta!")//allora dì all'utente che ha perso
          selectedMines = true;
        }
        userChoiceMade.push(userChoice);//inserisci la scelta dell'utente nella lista di ciò che è già stato scelto e non può essere scelto di nuovo
      }else{//se però il numero risulta già nella lista di quelli inseriti
        alert("Hai già inserito questo numero, scegline un altro mollaccione!");//sgrida l'utente e digli di sceglierne un altro
      }
    }
  }
}

if(hasWon){//se l'utente ha vinto
  alert("Wow! Sei un vero macho! Hai vinto! Ti promuovo al grado di Sergente!");//digli bravo
  alert("Hai fatto " + userChoiceMade.length + " punti. Sei quasi pronto per l'Afghanistan!");//e digli quanti punti ha fatto
}
});
