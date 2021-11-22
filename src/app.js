/* app.js */

import Deck from './deck';
import { select, listen } from './util';
import './style.css';

const CARD_VALUE_MAP = {
  '♠': '♠',
  '♣': '♣',
  '♥': '♥',
  '♦': '♦',
};

const computerCardSlot = select('.computer-card-slot');
const diamonds = select('.diamonds');
const clubs = select('.clubs');
const hearts = select('.hearts');
const spades = select('.spades');
const newGame = select('.new-game');

let inRound, computerDeck;

let score = 0;

function updateDeckCount() {
  const deck = select('.deck');
  deck.innerText = computerDeck.numberOfCards;
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = '';
  updateDeckCount();
}

// when user starts game
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  computerDeck = new Deck(deck.cards);

  inRound = false;
  console.log(
    'Start Card that is going to come out is:',
    computerDeck.cards[0].suit
  );

  cleanBeforeRound();
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.suit] === CARD_VALUE_MAP[cardTwo];
}

// when user clicks on a suit button
function flipCards(suit) {
  inRound = true;
  computerCardSlot.innerHTML = '';

  const computerCard = computerDeck.pop();
  if (computerDeck.cards.length < 1) {
    startGame();
    return;
  }
  console.log(
    'Card that is going to come out is: ,',
    computerDeck.cards[0].suit
  );

  computerCardSlot.appendChild(computerCard.getHTML());
  updateDeckCount();
  if (isRoundWinner(computerCard, suit)) {
    const text = select('.winner');
    score += 4;
    const string = `<h2>You win! Score: ${score} </h2>`;
    text.innerHTML = string;
  } else {
    const text = select('.winner');
    score -= 1;
    const string = `<h2>You lose. Score: ${score} </h2>`;
    text.innerHTML = string;
  }
}
startGame();

// when user clicks on new game
listen(newGame, 'click', () => {
  const deck = select('.deck');
  deck.innerText = '52';
  computerCardSlot.innerHTML = '';
  const text = select('.winner');
  text.innerHTML = '';
  score = 0;
  startGame();
});

// when user clicks on of the guess buttons
listen(diamonds, 'click', () => {
  flipCards('♦');
});

listen(clubs, 'click', () => {
  flipCards('♣');
});

listen(hearts, 'click', () => {
  flipCards('♥');
});

listen(spades, 'click', () => {
  flipCards('♠');
});
