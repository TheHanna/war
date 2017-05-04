(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
  function Deck() {
    _classCallCheck(this, Deck);

    var suits = ['hearts', 'clubs', 'spades', 'diamonds'];
    var faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];
    var types = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];

    this.cards = suits.reduce(function (acc, suit) {
      faces.forEach(function (face, index) {
        acc.push({ suit: suit, face: face, type: types[index], value: index + 1 });
      });
      return acc;
    }, []);
  }

  _createClass(Deck, [{
    key: 'shuffle',
    value: function shuffle() {
      _helper2.default.shuffler(this.cards);
    }
  }, {
    key: 'deal',
    value: function deal(hands) {
      this.cards.forEach(function (card, index) {
        var hand = hands[index % hands.length];
        hand.take(card);
      });
    }
  }]);

  return Deck;
}();

exports.default = Deck;

},{"./helper":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = function () {
  function Hand(name) {
    _classCallCheck(this, Hand);

    this.name = name;
    this.cards = [];
  }

  _createClass(Hand, [{
    key: "play",
    value: function play() {
      return this.cards ? this.cards.shift() : null;
    }
  }, {
    key: "take",
    value: function take(card) {
      this.cards.push(card);
    }
  }]);

  return Hand;
}();

exports.default = Hand;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Helper = {
  shuffler: function shuffler(cards) {
    var m = cards.length,
        t,
        i;
    // While there remain elements to shuffle
    while (m) {
      // Pick a remaining element
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element
      t = cards[m];
      cards[m] = cards[i];
      cards[i] = t;
    }
  }
};

exports.default = Helper;

},{}],4:[function(require,module,exports){
'use strict';

var _deck = require('./deck');

var _deck2 = _interopRequireDefault(_deck);

var _hand = require('./hand');

var _hand2 = _interopRequireDefault(_hand);

var _helper = require('./helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deck = new _deck2.default();
var hands = [new _hand2.default('player'), new _hand2.default('computer')];

var war = false;
var wars = 0;
var rounds = 0;
var maxSwing = 0;
var pool = [];
var playerDeck = document.querySelector('.player .deck');

var round = function round() {
  rounds++;
  var plays = play(war);
  show(plays);
  var result = resolve(plays);
  var winner = result.length > 1 ? null : result[0];
  war = !winner;
  if (winner) {
    // console.log(winner.player);
    reward(winner.player);
  }
  count();
  console.log('::=====-----=====::');
};

var play = function play(war) {
  console.log('playing');
  if (war) console.log('warring');
  if (war) wager();
  if (war) wars++;
  var plays = hands.map(function (hand) {
    return {
      player: hand.name,
      card: hand.play()
    };
  });
  plays.forEach(function (play) {
    pool.push(play.card);
  });
  return plays;
};

var show = function show(plays) {
  console.log('showing');
  plays.forEach(function (play) {
    var elem = document.querySelector('.' + play.player + ' .play');
    var img = 'img/cards/' + play.card.suit + play.card.face + '.png';
    elem.style.backgroundImage = 'url(' + img + ')';
  });
};

var resolve = function resolve(plays) {
  console.log('resolving');
  var max = Math.max.apply(Math, plays.map(function (play) {
    return play.card.value;
  }));
  return plays.reduce(function (acc, play) {
    if (play.card.value === max) acc.push(play);
    return acc;
  }, []);
};

var wager = function wager() {
  console.log('wagering');
  hands.forEach(function (hand) {
    pool.push(hand.play());
  });
};

var reward = function reward(winner) {
  console.log('rewarding');
  console.log('swing', pool.length);
  maxSwing = pool.length > maxSwing ? pool.length : maxSwing;
  _helper2.default.shuffler(pool);
  hands.forEach(function (hand) {
    if (hand.name === winner) {
      while (pool.length > 0) {
        hand.take(pool.shift());
      }
    }
  });
};

var count = function count() {
  console.log('counting');
  hands.forEach(function (hand) {
    var elem = document.querySelector('.' + hand.name + ' .count');
    if (hand.cards.length === 0) loser(hand.name);
    elem.innerHTML = hand.cards.length.toString();
  });
};

var loser = function loser(player) {
  var remove = hands.reduce(function (acc, hand, index) {
    return hand.cards.length === 0 ? index : acc;
  }, 0);
  hands.splice(remove, 1);
  victor();
};

var victor = function victor() {
  if (hands.length === 1) {
    clearInterval(intervalId);
    var winner = hands.shift();
    reward(winner.player);
    count();
    console.log(winner.name, 'wins!');
    console.log(rounds, 'rounds played!');
    console.log(wars, 'wars fought!');
    console.log(maxSwing, 'was the highest card swing!');
  }
};

deck.shuffle();
deck.deal(hands);

count();

var intervalId = void 0;
playerDeck.addEventListener('click', round);
window.addEventListener('keyup', function (evt) {
  if (evt.keyCode === 32) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(round, 50);
  }
});

},{"./deck":1,"./hand":2,"./helper":3}]},{},[1,2,3,4])

//# sourceMappingURL=bundle.js.map
