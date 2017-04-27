import React from 'react';
import { connect } from 'react-redux';
import { dealToPlayer, stand } from '../../app/action_creator';

export class Info extends React.Component {
    render() {
        /* Disable hit and stand buttons when game is over or player's stays */
        let disableButtons = false;
        if(this.props.hasStood || this.props.gameOver) {
            disableButtons = true;
        }
        return(
            <div id="info">

                <span id="player_record">
                    Wins: {this.props.winCount} Losses: {this.props.lossCount}
                </span>

                <span id="buttons">
                    <button disabled={disableButtons} onClick={this.props.onClickHit}> 
                        Hit 
                    </button>
                    <button disabled={disableButtons} onClick={this.props.onClickStand}> 
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
        hasStood: state.get('hasStood'),
        gameOver: state.get('gameOver')
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickHit: () => {
            dispatch(dealToPlayer());
        },
        onClickStand: () => {
            dispatch(stand());
        }
    };
};

/* connect is part of React-Redux, it is passed a component and the component is updated automatically when any state changes */
export const InfoContainer = connect(mapStateToProps, mapDispatchToProps)(Info);