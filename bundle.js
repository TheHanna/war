(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
      var m = this.cards.length,
          t,
          i;
      // While there remain elements to shuffle
      while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);
        // And swap it with the current element
        t = this.cards[m];
        this.cards[m] = this.cards[i];
        this.cards[i] = t;
      }
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

},{}],2:[function(require,module,exports){
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
'use strict';

var _deck = require('./deck');

var _deck2 = _interopRequireDefault(_deck);

var _hand = require('./hand');

var _hand2 = _interopRequireDefault(_hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var deck = new _deck2.default();
var hands = [new _hand2.default('player'), new _hand2.default('computer')];

var play = function play() {
  var plays = hands.map(function (hand) {
    return {
      player: hand.name,
      card: hand.play()
    };
  });
  return plays;
};

var show = function show(plays) {
  plays.forEach(function (play) {
    var elem = document.querySelector('.' + play.player + ' .play');
    var img = 'img/cards/' + play.card.suit + play.card.face + '.png';
    elem.style.backgroundImage = 'url(' + img + ')';
  });
};

var resolve = function resolve(plays) {
  var max = Math.max.apply(Math, plays.map(function (play) {
    return play.card.value;
  }));
  return plays.reduce(function (acc, play) {
    if (play.card.value === max) acc.push(play);
    return acc;
  }, []);
};

var count = function count() {
  hands.forEach(function (hand) {
    var elem = document.querySelector('.' + hand.name + ' .count');
    elem.innerHTML = hand.cards.length.toString();
  });
};

var victor = function victor(p, c) {
  if (p.value !== c.value) {
    var _hands$winner$toLower;

    var winner = p.value > c.value ? 'Player' : 'Computer';
    console.log(winner + ' wins!');
    (_hands$winner$toLower = hands[winner.toLowerCase()]).push.apply(_hands$winner$toLower, _toConsumableArray(shuffle(pool)));
    pool = [];
    count();
  } else {
    war = true;
    console.log('War!');
  }
};

var war = false;
var pool = [];
var playerDeck = document.querySelector('.player .deck');

deck.shuffle();
deck.deal(hands);

count();

playerDeck.addEventListener('click', function (evt) {
  var plays = play();
  var winner = resolve(plays);
  show(plays);
});

},{"./deck":1,"./hand":2}]},{},[1,2,3])

//# sourceMappingURL=bundle.js.map
