/* ImmutableJS provides a method named fromJS that allows us to convert nested
   JavaScript objects and arrays into immutable Maps and Lists */
import { fromJS, List } from 'immutable';
import seedrandom from 'seedrandom';

/* We will store the deck of cards in an 'immutable' list the cards inside the
   deck as immutable Maps */
export const shuffle = (array, seed) => {
    let i;
    let j;
    let x;

    /* shuffles the deck of cards */
    for(i = array.length; i; i--) {
        j = Math.floor(seedrandom(seed + i)() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};

export const newDeck = (seed) => {
    const ranks = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];
    const suits = ['S', 'H', 'D', 'C'];

    const deck = [];

    /* creates the deck of cards */
    ranks.forEach( (r) => {
        suits.forEach( (s) => {
            deck.push({ "rank": r, "suit": s});
        });
    });

    shuffle(deck, seed);

    return fromJS(deck);

};

/* Deal cards method from end of deck (List) */
export const deal = (deck, n, seed) => {
    if(n == 1) {
        const r = Math.floor(seedrandom(seed)() * deck.size);
        let dealtCards = new List([deck.get(r)]);
        let newDeck = deck.remove(r);
        return [newDeck, dealtCards];
    }

    let dealtCards = new List();
    let newDeck = deck;

    for(let i = 0; i < n; i++) {
        let[d, c] = deal(newDeck, 1, seed + i);
        dealtCards = dealtCards.push(c.first());
        newDeck = d;
    }

    return [newDeck, dealtCards];
    
};

/* Helper function for totaling player and dealer's hands */
export const rankAsNum = (rank) => {
    if(rank == 'J' || rank == 'Q' || rank == 'K') {
        return 10;

    } else {
        return rank;
    }
};

/* Helper function to calculate score */
export const score = (cards) => {
    const aces = cards.filter((card) => card.get('rank') == 'A');
    const nonAces = cards.filter((card) => card.get('rank') != 'A');

    if(nonAces.size == 0 && aces.size == 0) {
        return 0;

    } else if(aces.size == 0) { 
        return cards.reduce( (sum, card) => {
            return sum + rankAsNum(card.get('rank'));
      }, 0);

    } else {
        let acesAllOneScore = score(nonAces) + aces.size;
        if(acesAllOneScore <= 11) {
            acesAllOneScore += 10;
        }
        return acesAllOneScore;
    }
};



