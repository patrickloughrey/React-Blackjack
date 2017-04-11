/* ImmutableJS provides a method named fromJS that allows us to convert nested
   JavaScript objects and arrays into immutable Maps and Lists */
import { fromJS, List } from 'immutable';

/* We will store the deck of cards in an 'immutable' list the cards inside the
   deck as immutable Maps */
export const shuffle = (array) => {
    let i;
    let j;
    let x;

    /* shuffles the deck of cards */
    for(i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const newDeck = () => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'H', 'D', 'C'];

    const deck = [];

    /* creates the deck of cards */
    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });

    shuffle(deck);

    return fromJS(deck);

};

/* Deal cards method from end of deck (List) */
export const deal = (deck, n) => {
    let cardsDealt = deck.takeLast(2);
    let newDeck = deck.skipLast(2);

    return [newDeck, cardsDealt];
    
}