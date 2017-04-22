import React from 'react';
import { InfoContainer } from './info';
import Hand from './hand';

export default class App extends React.Component {
    render() {
        console.log(this.props);
        return (
          <div className="app">
              <h1> React Blackjack </h1>
              <InfoContainer />
                <strong> Player's Hand: </strong>
                <Hand cards={this.props.state.get('playerHand')} />
                <strong> Dealer's Hand: </strong>
                <Hand cards={this.props.state.get('dealerHand')} />
          </div>
        );
    }
};