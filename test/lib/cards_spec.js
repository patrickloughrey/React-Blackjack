import { expect } from 'chai';
import { List } from 'immutable';

import { newDeck, deal } from '../../lib/cards';

/* Write test using Mocha & Chai:
   Go to 'https://mochajs.org/' to see syntax */

describe('cards.js', () => {

    describe('newDeck', () => {
        it('the deck is an immutable list', () => {
            expect(newDeck()).to.be.instanceOf(List);
        });
        it('the deck starts out with 52 cards', () => {
            expect(newDeck().size).to.eq(52);
        });
    });

    describe('deal()', () => {
        const deck = newDeck();
        const n = 5;
        const [new_deck, new_hand] = deal(deck, n);

        it('returns the smaller deck', () => {
            expect(new_deck.size).to.eq(52 - n);    
        });

        it('returns hand of n cards', () => {
            expect(new_hand.size).to.eq(n);
        });

        it('puts correct cards in hand', () => {
            for(let i = n-1; i >= 0; i--) {
                expect(new_hand.get(i)).to.eq(deck.get(51-(n-1) + i));
            }
        });
    });
});