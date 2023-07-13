'use strict';

// Selecting Elements
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let diceEl = document.querySelector('.dice');
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
const rollDiceBtn = document.querySelector('.btn--roll');
const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

// Initialize variables
let scores, currentScore, playing, activePlayer;

// Starting Conditions
const init = function () {
  playing = true;
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;

  score0El.textContent = '0';
  score1El.textContent = '0';
  currentScore0El.textContent = '0';
  currentScore1El.textContent = '0';

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = !activePlayer ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    // generate random dice roll
    let dice = Math.trunc(Math.random() * 6 + 1);

    // display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// hold button
holdBtn.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', init);
