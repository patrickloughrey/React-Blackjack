import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import App from '../../app/components/app';
import { newDeck, deal } from '../../app/lib/cards';

let deck = newDeck();
let playerHand, dealerHand;

describe('<App />', () => {
    const rendered = shallow(<App />);

    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
});