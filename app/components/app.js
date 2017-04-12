import React from 'react';
import Info from './info';

export default class App extends React.Component {
    render() {
        return (
          <div className="app">
              <h1> Hello World! </h1>
              <Info />
          </div>
        );
    }
};