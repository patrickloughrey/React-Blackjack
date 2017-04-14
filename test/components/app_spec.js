import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import App from '../../app/components/app';
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
    const rendered = shallow(<App state={state}/>);

    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });

    it('passes props to <Info />', () => {
        const info = rendered.find('Info').first();
        expect(info).to.have.prop('winCount',
            state.get('winCount'));
        expect(info).to.have.prop('lossCount', 
            state.get('lossCount'));
        expect(info).to.have.prop('hasStood',
            state.get('hasStood'));
    });

    it('renders two <Hand /> components', () => {
        expect(rendered.find('Hand')).to.have.length(2);
    });

    it('passes props to <Hand />s', () => {
        expect(rendered.find('Hand').first()).to.have.prop('cards', state.get("playerHand"));
        expect(rendered.find('Hand').last()).to.have.prop('cards', state.get("dealerHand"));
    })
});