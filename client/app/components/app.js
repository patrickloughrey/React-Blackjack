import React from 'react';
import { InfoContainer } from './info';
import Hand from './hand';
import { connect } from 'react-redux';
import { GameOverMessageContainer } from './game_over';
import jquery from 'jquery';

export class App extends React.Component {

    componentDidMount() {
        console.log("Component mounted");
        $('#reverse-arc').circleType({radius: 160, dir:-1});
    }

    render() {
        console.log(this.props);
        let messageComponent;

        if(this.props.gameOver) {
            messageComponent = <GameOverMessageContainer win={this.props.playerWon} />;
        }

        return (
          <div className="app"> 
              <h1> BLACKJACK </h1>
              <h2> PAYS 3 TO 2 </h2>
              <h4 id="reverse-arc"> DEALER MUST STAND ON 17 AND DRAW TO 16 </h4>
                { messageComponent }
                <Hand cards={this.props.dealerHand} />
                <div id="container">
                    <div id="circle"> </div>
                    <div id="circle"> </div>
                    <div id="circle"> </div>
                </div>
                <Hand cards={this.props.playerHand} />
                <InfoContainer />
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