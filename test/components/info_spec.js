import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Info from '../../app/components/info';

describe('<Info />', () => {
  
  describe('when hasStood is false, when player wishes to hit' , () => { 
      const rendered = shallow(<Info winCount={1} lossCount={2} hasStood={false} />);

      it('displays wins/losses record', () => {
        expect(rendered).to.include.text("Wins: 1");
        expect(rendered).to.include.text("Losses: 2");
      });

      const buttons = rendered.find('button');
      it('displays hit stay buttons', () => {
        const buttons = rendered.find('button');
        expect(buttons).to.have.length(2);
        expect(buttons.first()).to.have.text('Hit');
        expect(buttons.last()).to.have.text('Stay');
      });

      it('enables the hit and stay buttons', () => {
        buttons.forEach((x) => {
            expect(x).to.not.have.attr('disabled');
        });
      });

  });

  describe('when hasStood is true, when player wishes to stay', () => {
      const rendered = shallow(<Info winCount={1} lossCount={2} hasStood={false} />);

      it('disables the hit and stay buttons', () => {
        const buttons = rendered.find('button');
        buttons.forEach((x) => {
            expect(x).to.have.attr('disabled');
        });
      });

  });

});
