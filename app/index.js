import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { newDeck } from './lib/cards';

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

/* We don't use const anymore because the 'deck' variable will be pointing to a new 
   immutable List rather than pointing to a single array that mutates */

/* Create a deck of cards {imported from cards} */
let deck = newDeck();
console.log("Start deck: ");
console.log(deck);

/* Create a player hand */
let playerHand = deck.takeLast(2);
deck = deck.skipLast(2);

/* Create a dealer hand */
let dealerHand = deck.takeLast(2);
deck = deck.skipLast(2);

console.log("End deck: ");
console.log(deck);

console.log("Player Hand: ");
console.log(playerHand);

console.log("Dealer Hand: ");
console.log(dealerHand);