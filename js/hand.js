export default class Hand {
  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  play() {
    return this.cards ? this.cards.shift() : null;
  }

  take(card) {
    this.cards.push(card);
  }
}