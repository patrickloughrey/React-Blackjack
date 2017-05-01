import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Hand from '../../app/components/hand';
import { newDeck, deal } from '../../app/lib/cards';

let deck = newDeck();
let hand;

const n = 2;
[deck, hand] = deal(deck, n);

describe('<Hand />', () => {
    describe('without dummy cards', () => {
        const rendered = shallow(<Hand cards={hand} />);
        const cards = rendered.find('Card');

        it('renders correct number of cards', () => {
            expect(cards).to.have.length(n+1);
        });

        it('gives each card the correct number of props', () => {
            hand.forEach((card, i) => {
                expect(cards.at(i)).to.have.prop('suit', card.get('suit'));
                expect(cards.at(i)).to.have.prop('rank', card.get('rank'));
                expect(cards.at(i)).to.have.prop('faceDown', false);
            });
        });
    });

    describe('with dummy cards', () => {
        const rendered = shallow(<Hand cards={hand.push(new Map())} />);
        const cards = rendered.find('Card');

        it('renders correct number of cards', () => {
            expect(cards).to.have.length(n+1);
        });

        it('gives dummy card faceDown=true', () => {
            expect(cards.last()).to.have.prop('faceDown', true);
        });
    });

});