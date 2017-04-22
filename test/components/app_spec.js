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

    it('renders one <InfoContainer /> component', () => {
        expect(rendered.find('Connect(Info)')).to.have.length(1);
    });


    it('renders two <Hand /> components', () => {
        expect(rendered.find('Hand')).to.have.length(2);
    });

    it('passes props to <Hand />s', () => {
        expect(rendered.find('Hand').first()).to.have.prop('cards', state.get("playerHand"));
        expect(rendered.find('Hand').last()).to.have.prop('cards', state.get("dealerHand"));
    })
});