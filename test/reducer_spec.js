import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';
import { setUpGame, setRecord, dealToPlayer, stand } from '../app/action_creator';
import { newDeck } from '../app/lib/cards';

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
            });

            it('sets up gameOver', () => {
                expect(nextState.get('gameOver')).to.eq(false);
            });

            it('sets up playerWon', () => {
                expect(nextState.get('playerWon')).to.eq(undefined);
            });

        });

        describe('with existing initial state', () => {
            const initialState = new Map({'winCount': 10, 'lossCount': 7, 'deck': 'fake deck'});
            const nextState = reducer(initialState, action);

            it('adds new variables', () => {
                expect(Array.fromt(nextState.keys())).to.include(
                    'deck', 'playerHand', 'dealerHand', 
                    'hasStood', 'gameOver', 'playerWon'
                );
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

    describe("DEAL_TO_PLAYER", () => {
        const action = dealToPlayer();
        const initialState = new Map({"playerHand": new List(), "deck": newDeck()});
        const nextState = reducer(initialState, action);

        it('adds one card to player hand', () => {
            expect(nextState.get('playerHand').size).to.eq(initialState.get('playerHand').size + 1);
        });
        it('removes one card from deck', () => {
            expect(nextState.get('deck').size).to.eq(initialState.get('deck').size - 1);
        });

        describe('when player gets more than 21 points', () => {
            const initialState = fromJS({
                "playerHand": [{rank: 'K'}, {rank: 'Q'}],
                "deck": fromJS([{rank: 'J'}]),
                "lossCount": 0
            });
            const nextState = reducer(initialState, action);

            it('increases loss count by 1', () => {
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount') + 1);
            });
        });
        
    });

    describe("STAND", () => {
        const action = stand();
        const initialState = new Map({ "hasStood": false });
        const nextState = reducer(initialState, action);

        it('sets hasStood to true', () => {
            expect(nextState.get('hasStood').to.eq(true));
        });
    });

});




