import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';

import Card from '../../app/components/card';

const suit = 'C';
const rank = 2;

describe('<Card />', () => {
    const rendered = shallow(<Card suit={suit} rank={rank} />);

    it('shows rank and suit', () => {
        expect(rendered).to.include.text(suit);
        expect(rendered).to.include.text(rank);
    });

    it('adds a css class for the suit', () => {
        expect(rendered.find(`.card.${suit}`)).to.have.length(1);
    });

});