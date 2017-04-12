import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import App from '../../app/components/app';

describe('<App />', () => {
    const rendered = shallow(<App />);

    it('renders <Info /> component', () => {
        expect(rendered.find('Info')).to.have.length(1);
    });
});