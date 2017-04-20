import React from 'react';
import { connect } from 'react-redux';

export class Info extends React.Component {
    render() {
        return(
            <div id="info">

              <span id="player_record">
                Wins: {this.props.winCount} Losses: {this.props.lossCount}
              </span>

              <span id="buttons">
                  <button disabled={this.props.hasStood}> 
                      Hit 
                  </button>
                  <button disabled={this.props.hasStood}> 
                      Stay 
                  </button>
              </span>

            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        winCount: state.get('winCount'),
        lossCount: state.get('lossCount'),
        hasStood: state.get('hasStood')
    };
}

/* connect is part of React-Redux, it is passed a component and the component is updated automatically when any state changes */
export const InfoContainer = connect(mapStateToProps)(Info);