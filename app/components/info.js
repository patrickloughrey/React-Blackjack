import React from 'react';

export default class Info extends React.Component {
    render() {
        return(
            <div id="info">
              <span id="player_record">
                Wins: {this.props('winCount')}
                Losses: {this.props('lossCount')}
              </span>
            </div>
        );
    }
};