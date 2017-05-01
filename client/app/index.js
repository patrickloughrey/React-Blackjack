import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from './components/app';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducer';
import { setUpGame, setRecord } from '../app/action_creator';

import { newDeck, deal } from './lib/cards';
import { Map, fromJS } from 'immutable';

/* Import stylesheet */
require('./css/main.scss');

/* Beginning of game, set info component up */
/* Pass Redux Dev Tools to createStore() to use as middleware to access dev tools */
let store = createStore(reducer, undefined, window.devToolsExtension ? window.devToolsExtension() : undefined);
store.dispatch(setRecord(0, 0));
store.dispatch(setUpGame());


/* We don't use const anymore because the 'deck' variable will be pointing to a new 
   immutable List rather than pointing to a single array that mutates */

/* Create a deck of cards {imported from cards} */
let deck = newDeck();

/* Create a player and dealer hands calling deal method that is imported*/
let playerHand, dealerHand;
[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 1); /* Dealer is only dealt one real card, dummy card is face down */

/* Create dummy card */
dealerHand = dealerHand.push(new Map());

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
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('app')
);


console.log("End deck: ");
console.log(deck);

console.log("Player Hand: ");
console.log(playerHand);

console.log("Dealer Hand: ");
console.log(dealerHand);