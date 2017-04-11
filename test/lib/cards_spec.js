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
});