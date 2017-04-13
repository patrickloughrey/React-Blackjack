import React from 'react';

export default class Hand extends React.Component {
    render() {
        return(
            <div className="hand">
              {/* This.props.card is a List object that contains a Map for each card. We are rendering
                  a card element for each Map -> invoke map() for each card */}
              {this.props.card.map((card, i) => 
                  <Card suit={card.get('suit')}
                        rank={card.get('rank')}
                        key={i}
              )}
            </div>
        );
    }
};