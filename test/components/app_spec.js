import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import { App } from '../../app/components/app';
import { newDeck, deal } from '../../app/lib/cards';

let deck = newDeck();
let playerHand, dealerHand;

[deck, playerHand] = deal(deck, 2);
[deck, dealerHand] = deal(deck, 2);

const state = fromJS({
    deck,
    playerHand,
    dealerHand,
    "winCount": 0,
    "lossCount": 0,
    hasStood: false
});

describe('<App />', () => {
    const rendered = shallow(<App playerHand={playerHand} dealerHand={dealerHand} />);

    it('renders one <InfoContainer /> component', () => {
        expect(rendered.find('Connect(Info)')).to.have.length(1);
    });


    it('renders two <Hand /> components', () => {
        expect(rendered.find('Hand')).to.have.length(2);
    });

    it('passes props to <Hand />s', () => {
        expect(rendered.find('Hand').first()).to.have.prop('cards', state.get("playerHand"));
        expect(rendered.find('Hand').last()).to.have.prop('cards', state.get("dealerHand"));
    });

    describe('when gameOver', () => {
        const rendered = shallow(<App gameOver={true} />);

        it('renders <GameOverMessageContainer />', () => {
            expect(rendered.find('Connect(GameOverMessage)')).to.have.length(1);
        });

        describe('player won', () => {
            const rendered = shallow(<App gameOver={true} playerWon={true} />);
            it('gives <GameOverMessageContainer /> correct prop', () => {
                expect(rendered.find('Connect(GameOverMessage)')).to.have.prop('win', true);
            });
        });

        describe('player lost', () => {
            const rendered = shallow(<App gameOver={true} playerWon={false} />);
            it('gives <GameOverMessageContainer /> correct prop', () => {
                expect(rendered.find('Connect(GameOverMessage)')).to.have.prop('win', false);
            });
        });
    });

});
