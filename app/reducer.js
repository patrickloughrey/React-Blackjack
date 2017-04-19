import { Map } from 'immutable';
import { newDeck, deal } from './lib/cards';


const setUpGame = (currentState) => {
  /* Function to set up the game by dealing cards for dealer and player */
  let deck = newDeck();
  let playerHand, dealerHand;

  [deck, playerHand] = deal(deck, 2);
  [deck, dealerHand] = deal(deck, 1);

  /* If state changes, i.e. if player "hits" */
  dealerHand = dealerHand.push(new Map());

  const hasStood = false;

  const newState = new Map({ deck, playerHand, dealerHand, hasStood });

  return currentState.merge(newState); /* We use merge here because we want to maintain continuous access to variables like 'winCount' */

};

const setRecord = (currentState, wins, losses) => {
    return currentState.merge(new Map({ 'winCount': wins, 'lossCount': losses }));
}

export default function(currentState = new Map(), action) {

    switch(action.type) {
        case 'SET_UP_GAME':
          return setUpGame(currentState);
        case 'SET_RECORD':
          return setRecord(currentState, action.wins, action.losses);
    }

    return currentState;
}