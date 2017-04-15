import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { newDeck, deal } from './lib/cards';
import { fromJS } from 'immutable';

/* Import stylesheet */
require('./css/main.scss');

/* We don't use const anymore because the 'deck' variable will be pointing to a new 
   immutable List rather than pointing to a single array that mutates */

/* Create a deck of cards {imported from cards} */
let deck = newDeck();

/* Create a player and dealer hands calling deal method that is imported*/
let playerHand, dealerHand;
[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 2);

const state = fromJS({
    deck,
    playerHand,
    dealerHand,
    "winCount": 0,
    "lossCount": 0,
    hasStood: false
});

console.log(state);

ReactDOM.render(
    <App state={state}/>,
    document.getElementById('app')
);


console.log("End deck: ");
console.log(deck);

console.log("Player Hand: ");
console.log(playerHand);

console.log("Dealer Hand: ");
console.log(dealerHand);