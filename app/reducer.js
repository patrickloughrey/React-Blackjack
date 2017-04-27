import { Map } from 'immutable';
import { newDeck, deal, score } from './lib/cards';


const setUpGame = (currentState, seed) => {
  /* Function to set up the game by dealing cards for dealer and player */
  let deck = newDeck(seed);
  let playerHand, dealerHand;

  [deck, playerHand] = deal(deck, 2, seed);
  [deck, dealerHand] = deal(deck, 1, seed + 1);

  /* If state changes, i.e. if player "hits" */
  dealerHand = dealerHand.push(new Map());

  const hasStood = false;

  let gameOver = false;
  let playerWon = undefined;
  let winCount = currentState.get('winCount') || 0;

  if(score(playerHand) == 21) {
      gameOver = true;
      playerWon = true;
      winCount++;
  }

  const newState = new Map({ 
      deck, playerHand, 
      dealerHand, hasStood,
      gameOver, playerWon,
      winCount
  });

  return currentState.merge(newState); /* We use merge here because we want to maintain continuous access to variables like 'winCount' */

};

const setRecord = (currentState, wins, losses) => {
    return currentState.merge(new Map({ 'winCount': wins, 'lossCount': losses }));
};

const dealToPlayer = (currentState, seed) => {
    const [deck, newCard] = deal(currentState.get('deck'), 1, seed);
    const playerHand = currentState.get('playerHand').push(newCard.get(0));

    let newState = new Map({ deck, playerHand });
    const newScore = score(playerHand);

    if(newScore > 21) {
        const lossCount = currentState.get('lossCount') + 1;
        const gameOver = true;
        const playerWon = false;
        newState = newState.merge({lossCount, gameOver, playerWon});
    }

    return currentState.merge(newState);
};

const stand = (currentState) => {
    return currentState.merge(new Map({ "hasStood": true }));
};

export default function(currentState = new Map(), action) {

    switch(action.type) {
        case 'SET_UP_GAME':
          return setUpGame(currentState, action.seed);
        case 'SET_RECORD':
          return setRecord(currentState, action.wins, action.losses);
        case 'DEAL_TO_PLAYER':
          return dealToPlayer(currentState, action.seed);
        case 'STAND':
          return stand(currentState);
    }

    return currentState;
}