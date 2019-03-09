import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Generation />
        <Dragon />
      </div>
    );
  }
}

export default App;
