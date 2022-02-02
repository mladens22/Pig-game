'use strict';

//SELEKTOVANJE ELEMENATA
const score0El= document.querySelector("#score--0");
const score1El= document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");





//POCETNE VRIJEDNOSTI
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();


const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent= 0;
  currentScore = 0;
  //prebaci na sljedeceg igraca
  activePlayer=activePlayer===0 ? 1 : 0;  //ako je aktivni igrac bio 0 prebaci na 1
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//ROLLING DICE functionality
btnRoll.addEventListener('click', function(){
//1. GENERISANJE RANDOM BROJA
if(playing) {
const dice = Math.floor(Math.random()*6) + 1;


//2. PRIKAZI KOCKU

diceEl.classList.remove("hidden");
diceEl.src= `dice-${dice}.png`;  //dice-4.png i prikazace

//3. PROVJERI DA LI JE 1  : AKO JE TRUE IDI NA SLJ IGRACA

if(dice !== 1) {
//dodaj na trenutni skor
currentScore = currentScore + dice;
document.getElementById(`current--${activePlayer}`).textContent = currentScore;


// current0El.textContent = currentScore; //sadrzaj tog elementa je trenutni skor

} else {

  switchPlayer();
    }
  }
});

//DRZANJE VRIJEDNOSTI I RESET TRENUTNE VRIJ.

btnHold.addEventListener('click', function () {
  if(playing){
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[0] = scores[0] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

      if(scores[activePlayer] >=20) {
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

      } else {

        switchPlayer();

      }
    }
});

btnNew.addEventListener('click', init);
