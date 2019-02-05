import React, { Component } from 'react';
import './App.css';
import SocketController from './components/SocketController';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SocketController/>
      </div>
    );
  }
}

export default App;
