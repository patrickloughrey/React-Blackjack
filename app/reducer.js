import { Map } from 'immutable';
import { newDeck, deal } from './lib/cards';


const setUpGame = (currentState) => {
  /* Function to set up the game by dealing cards for dealer and player */
  let deck = newDeck();
  let playerHand, dealerHand;

  [deal, playerHand] = deal(deck, 2);
  [deal, dealerHand] = deal(deck, 1);

  /* If state changes, i.e. if player "hits" */
  dealerHand = dealerHand.push(new Map());

  const hasStood = false;

  const newState = new Map({ deck, playerHand, dealerHand, hasStood });

  return newState;

};

export default function(currentState = new Map(), action) {

    switch(action.type) {
        case 'SET_UP_GAME':
          return setUpGame();
    }

    return currentState;
}