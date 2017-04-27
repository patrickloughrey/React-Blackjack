import React from 'react';

/* JSX will not let you do multiple if-else statements within the return function.
   So, we do it outside of return, save it to a variable, then pass the variable as a prop */
export default class GameOverMessage extends React.Component {
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