import React from 'react';
import { connect } from 'react-redux';
import { setUpGame } from '../action_creator';

/* JSX will not let you do multiple if-else statements within the return function.
   So, we do it outside of return, save it to a variable, then pass the variable as a prop */
export class GameOverMessage extends React.Component {
    render() {
        let message;

        if(this.props.win === undefined) {
            message = "Tie!";

        } else if(this.props.win === true) {
            message = "You Win!";

        } else {
            message = "You Lose";
        }

        return(
            <div id="game_over_message">
                { message }
                <button onClick={this.props.nextGame}>Next Game</button>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        nextGame: () => dispatch(setUpGame())
    };
}

export const GameOverMessageContainer = connect(undefined, mapDispatchToProps)(GameOverMessage);