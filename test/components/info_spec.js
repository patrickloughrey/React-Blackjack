import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Info from '../../app/components/info';

describe('<Info />', () => {
    const rendered = shallow(<Info winCount={1} lossCount={2} hasStood={false} />);

    it('displays wins/losses record', () => {
        expect(rendered).to.include.text("Wins: 1");
        expect(rendered).to.include.text("Losses: 2");
    });
});