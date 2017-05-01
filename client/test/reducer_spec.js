import { Map, List, fromJS } from 'immutable';
import { expect } from 'chai';
import { setUpGame, setRecord, dealToPlayer, stand } from '../app/action_creator';
import { newDeck } from '../app/lib/cards';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

import reducer from '../app/reducer';

describe('reducer', () => {
    describe('SET_UP_GAME', () => {
        /* Uses helper method imported from action creator */
        const action = setUpGame();
        const cardUtils = { };
        const stubbedReducer = proxyquire('../app/reducer.js', {'./lib/cards': cardUtils}).default;

        describe('when not dealt winning hand', () => {
            cardUtils.score = () => 10;

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

        describe('when dealt winning hand', () => {
            const cardUtils = { };
            const stubbedReducer = proxyquire('../app/reducer.js', {'./lib/cards': cardUtils}).default;
            cardUtils.score = () => 21;

            const initialState = undefined;
            const nextState = stubbedReducer(initialState, action);

            it('sets gameOver and playerWon', () => {
                expect(nextState.get('gameOver')).to.eq(true);
                expect(nextState.get('playerWon')).to.eq(true);
            });

            it('increments winCount', () => {
                expect(nextState.get('winCount')).to.eq(1);
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

            it('toggles gameOver and sets playerWon', () => {
                expect(nextState.get('gameOver')).to.eq(true);
                expect(nextState.get('playerWon')).to.eq(false);
            });
            
        });
        
    });

    describe("STAND", () => {
        const action = stand();
        const cardUtils = { };
        const stubbedReducer = proxyquire('../app/reducer.js', {'./lib/cards': cardUtils}).default;

        const initialState = new Map({
            hasStood: false,
            dealHand: new List(),
            winCount: 0,
            lossCount: 0
        });

        it('removes dummy card', () => {
            const initialState = fromJS({
                dealerHand: [{suit: 'S', rank: 'K'}, {}]
            });

            cardUtils.score = sinon.stub();
            cardUtils.score.returns(21);

            const nextState = stubbedReducer(initialState, action);
            expect(nextState.get('dealerHand').size).to.eq(1);
        });

        it('sets hasStood to true', () => {
            cardUtils.score = sinon.stub();
            cardUtils.score.returns(21);

            const nextState = stubbedReducer(initialState, action);
            expect(nextState.get('hasStood').to.eq(true));
        });

        describe('dealer drawing', () => {

            beforeEach( () => {
                cardUtils.score = sinon.stub();
                cardUtils.deal = sinon.stub();
                cardUtils.deal.returns([new List(), new List()]);
            });

            it('does not draw when total is > 17', () => {
                cardUtils.score.return(18);
                stubbedReducer(initialState, action);
                expect(cardUtils.deal.called).to.eq(false);
            });

            it('stops drawing when total is 17', () => {
                cardUtils.score.onCall(0).returns(10);
                cardUtils.score.onCall(1).returns(17);

                stubbedReducer(initialState, action);
                expect(cardUtils.deal.calledOnce).to.eq(true);
            });
        });

        describe('determining winner', () => {
            beforeEach( () => {
                cardUtils.score = sinon.stub();
                cardUtils.deal = sinon.stub();
                cardUtils.deal.returns([new List(), new List()]);
            });

            it('increments win count and sets playerWon if player wins', () => {
                cardUtils.score.onCall(0).returns(17);
                cardUtils.score.onCall(1).returns(20);
                cardUtils.score.onCall(2).returns(17); /* Dealer's score, lower than player's */

                const nextState = stubbedReducer(initialState, action);

                expect(nextState.get('winCount')).to.eq(initialState.get('winCount') + 1);
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount'));
                expect(nextState.get('playerWon')).to.eq(true);
            });

            it('increments win count and sets playerWon if dealer busts', () => {
                cardUtils.score.onCall(0).returns(17);
                cardUtils.score.onCall(1).returns(20);
                cardUtils.score.onCall(2).returns(22); /* Dealer's score, bust */

                const nextState = stubbedReducer(initialState, action);

                expect(nextState.get('winCount')).to.eq(initialState.get('winCount') + 1);
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount'));
                expect(nextState.get('playerWon')).to.eq(true);
            });

            it('does not change count if tie', () => {
                cardUtils.score.onCall(0).returns(17);
                cardUtils.score.onCall(1).returns(17);
                cardUtils.score.onCall(2).returns(17); /* Dealer's score, tied player's score */

                const nextState = stubbedReducer(initialState, action);

                expect(nextState.get('winCount')).to.eq(initialState.get('winCount'));
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount'));
                expect(nextState.get('playerWon')).to.eq(undefined);
            });

            it('increments loss count and sets playerWon if dealer wins', () => {
                cardUtils.score.onCall(0).returns(17);
                cardUtils.score.onCall(1).returns(20);
                cardUtils.score.onCall(2).returns(21); /* Dealer's score, dealer wins */

                const nextState = stubbedReducer(initialState, action);

                expect(nextState.get('winCount')).to.eq(initialState.get('winCount'));
                expect(nextState.get('lossCount')).to.eq(initialState.get('lossCount') + 1);
                expect(nextState.get('playerWon')).to.eq(false);
            });
        });
        
    });

});




