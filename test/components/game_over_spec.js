import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { GameOverMessage } from '../../app/components/game_over';

describe('<GameOverMessage />', () => {

    describe('for win', () => {
        const rendered = shallow(<GameOverMessage win={true} />);

        it('displays message', () => {
            expect(rendered).to.include.text("You win!");
        });
    });

    describe('for loss', () => {
        const rendered = shallow(<GameOverMessage win={false} />);

        it('displays message', () => {
            expect(rendered).to.include.tex("You lose");
        });
    });

    describe('for draw', () => {
        const rendered = shallow(<GameOverMessage win={undefined} />);

        if('display message', () => {
            expect(rendered).to.include.text("Tie!");
        });
    });


});