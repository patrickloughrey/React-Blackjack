import React from 'react';
import Card from './card';

/* This.props.card is a List object that contains a Map for each card. We are rendering
   a card element for each Map -> invoke map() for each card */ 
   
export default class Hand extends React.Component {
    render() {
        return(
            <div className="hand">
              {this.props.cards.map((card, i) => 
                  <Card suit={card.get('suit')}
                        rank={card.get('rank')}
                        faceDown={!(card.has('suit') && card.has('rank'))}
                        key={i} />
              )}
            </div>
        );
    }
};