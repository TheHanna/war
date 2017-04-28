import Deck from './deck';
import Hand from './hand';
import Helper from './helper';

const deck = new Deck();
let hands = [
  new Hand('player'),
  new Hand('computer')
];

let war = false;
let pool = [];
let playerDeck = document.querySelector('.player .deck');

const round = function() {
  let plays = play(war);
  show(plays);
  let result = resolve(plays);
  let winner = result.length > 1 ? null : result[0];
  war = !winner;
  if (winner) {
    console.log(winner.player);
    reward(winner.player);
  }
  count();
}

const play = function(war) {
  if (war) wager();
  let plays = hands.map(hand => {
    return {
      player: hand.name,
      card: hand.play()
    }
  });
  plays.forEach(play => { pool.push(play.card); });
  return(plays);
}

const show = function(plays) {
  plays.forEach(play => {
    let elem = document.querySelector(`.${play.player} .play`);
    let img = `img/cards/${play.card.suit}${play.card.face}.png`;
    elem.style.backgroundImage = `url(${img})`;
  });
}

const resolve = function(plays) {
  let max = Math.max.apply(Math, plays.map(play => play.card.value));
  return plays.reduce((acc, play) => {
    if (play.card.value === max) acc.push(play);
    return acc;
  }, []);
}

const wager = function() {
  hands.forEach(hand => {
    pool.push(hand.play());
  });
}

const reward = function(winner) {
  Helper.shuffler(pool);
  hands.forEach(hand => {
    if (hand.name === winner) {
      while (pool.length > 0) {
        hand.take(pool.shift());
      }
    }
  })
}

const count = function() {
  hands.forEach(hand => {
    let elem = document.querySelector(`.${hand.name} .count`);
    if (hand.cards.length === 0) loser(hand.name);
    elem.innerHTML = hand.cards.length.toString();
  });
}

const loser = function(player) {
  let remove = hands.reduce((acc, hand, index) => {
    return hand.cards.length === 0 ? index : acc;
  }, 0);
  hands.splice(remove, 1);
  victor();
}

const victor = function() {
  if (hands.length === 1) {
    clearInterval(intervalId);
    let winner = hands.shift();
    console.log(winner.name, 'wins!');
  }
}

deck.shuffle();
deck.deal(hands);

count();

let intervalId;
playerDeck.addEventListener('click', round);
window.addEventListener('keyup', evt => {
  if (evt.keyCode === 32) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(round, 250);
  }
})
