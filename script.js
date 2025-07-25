'use strict';

//Selecting Elements
const score0El = document.querySelector('#score--0');
const curr0El = document.getElementById('current--0');
const curr1El = document.getElementById('current--1');

const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');

const player1El = document.querySelector('.player--1');
// starting conditions:
 let scores, currScore, activePlayer, playing;
const init=function(){
     scores = [0, 0];
     currScore = 0;
     activePlayer = 0;
     playing = true;

     score0El.textContent = 0;
    score1El.textContent = 0;
    curr0El.textContent=0;
    curr1El.textContent=0;

    player0El.classList.remove('player--winner');
     player1El.classList.remove('player--winner');
     player0El.classList.add('player--active');
     player1El.classList.remove('player--active');
     
    
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//Starting conditions:

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  //Generating a random dice roll:
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    //Display dice:
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Check for rolled 1:if true switch to next
    if (dice !== 1) {
      //add dice to curr score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

// Hold button functionality

btnHold.addEventListener('click', function () {
    if(playing){
  //1. Add current score to active player's score
  scores[activePlayer] += currScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. check if player's score is >=100
  if (scores[activePlayer] >= 100) {
    //Finish the game
    playing = false;
     diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //3.Switch to next player
    switchPlayer();
  }
}
});

btnNew.addEventListener('click', init);
