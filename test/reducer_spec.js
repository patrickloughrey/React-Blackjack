import { Map } from 'immutable';
import { expect } from 'chai';
import { setUpGame, setRecord } from '../app/action_creator';

import reducer from '../app/reducer';

describe('reducer', () => {
    describe('SET_UP_GAME', () => {
        /* Uses helper method imported from action creator */
        const action = setUpGame();

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

        describe('with existing initial state', () => {
            const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
            const nextState = reducer(initialState, action);

            it('adds new variables', () => {
                expect(Array.fromt(nextState.keys())).to.include('deck', 'playerHand', 'dealerHand', 'hasStood');
            });

            it('keeps old variables', () => {
                expect(nextState.get('winCount')).to.eq(10);
                expect(nextState.get('lossCount')).to.eq(7);
            });

            it('overwrites old variables', () => {
                expect(nextState.get('deck')).to.not.eq('fake deck');
            });
        });

    });

    describe("SET_RECORD", () => {
        /* Uses helper method sending it wins/losses parameters */
        const action = setRecord(3, 2);

        const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
        const nextState = reducer(initialState, action);

        it('sets winCount and lossCount', () => {
            expect(nextState.get('winCount')).to.eq(3);
            expect(nextState.get('lossCount')).to.eq(2);
        });

        it('keeps old variables', () => {
            expect(nextState.get('deck')).to.eq('fake deck');
        });
    });

});




