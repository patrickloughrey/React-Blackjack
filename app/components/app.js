import React from 'react';
import { InfoContainer } from './info';
import Hand from './hand';
import { connect } from 'react-redux';
import { GameOverMessageContainer } from './game_over';

export class App extends React.Component {
    render() {
        console.log(this.props);
        let messageComponent;

        if(this.props.gameOver) {
            messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        }

        return (
          <div className="app">
              <h1> React Blackjack </h1>
              <InfoContainer />
                { messageComponent }
                <strong> Player's Hand: </strong>
                <Hand cards={this.props.playerHand} />
                <strong> Dealer's Hand: </strong>
                <Hand cards={this.props.dealerHand} />
          </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        playerHand: state.get('playerHand'),
        dealerHand: state.get('dealerHand'),
        gameOver: state.get('gameOver'),
        playerWon: state.get('playerWon')
    };
}

export const AppContainer = connect(mapStateToProps)(App);