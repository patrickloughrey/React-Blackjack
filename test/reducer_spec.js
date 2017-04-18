import { Map } from 'immutable';
import { expect } from 'chai';

import reducer from '../app/reducer';

describe('reducer', () => {
    describe('SET_UP_GAME', () => {
        const action = {
            type: 'SET_UP_GAME'
        }

        describe('initially empty state', () => {
            const initialState = undefined;
            const nextState = reducer(initialState, action); /* Mandatory parameters passed to redux's reducer method */

            it('sets up deck of cards', () => {
                expect(nextState.get('deck').size).to.eq(49);
            });

            it('set up playerHand', () => {
                expect(nextState.get('playerHand').size).to.eq(2);
            });

            it('set up dealerHand', () => {
                expect(nextState.get('dealerHand').size).to.eq(2);
                expect(nextState.get('dealerHand').last()).to.eq(new Map());
            });

            it('sets up hasStood', () => {
                expect(nextState.get('hasStood')).to.eq(false);
            })

        });
    });
});