import Deck from './deck';
import Hand from './hand';

const deck = new Deck();
const hands = [
  new Hand('player'),
  new Hand('computer')
];

const play = function() {
  let plays = hands.map(hand => {
    return {
      player: hand.name,
      card: hand.play()
    }
  });
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

const count = function() {
  hands.forEach(hand => {
    let elem = document.querySelector(`.${hand.name} .count`);
    elem.innerHTML = hand.cards.length.toString();
  });
}

const victor = function(p, c) {
  if (p.value !== c.value) {
    let winner = p.value > c.value ? 'Player' : 'Computer';
    console.log(`${winner} wins!`);
    hands[winner.toLowerCase()].push(...shuffle(pool));
    pool = [];
    count();
  } else {
    war = true;
    console.log('War!');
  }
}

let war = false;
let pool = [];
let playerDeck = document.querySelector('.player .deck');

deck.shuffle();
deck.deal(hands);

count();

playerDeck.addEventListener('click', evt => {
  let plays = play();
  let winner = resolve(plays);
  show(plays);
});
