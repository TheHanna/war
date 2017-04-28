import Helper from './helper';

export default class Deck {
  constructor() {
    const suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
    const types = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'jack', 'queen', 'king', 'ace'];

    this.cards = suits.reduce((acc, suit) => {
      faces.forEach((face, index) => {
        acc.push({suit: suit, face: face, type: types[index], value: index + 1})
      });
      return acc;
    }, []);
  }

  shuffle() {
    Helper.shuffler(this.cards);
  }

  deal(hands) {
    this.cards.forEach((card, index) => {
      let hand = hands[index%hands.length];
      hand.take(card);
    });
  }
}