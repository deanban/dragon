import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

import Generation from './components/Generation';
import Dragon from './components/Dragon';

import generationReducer from './reducers/generationReducer';

const store = createStore(generationReducer);

store.dispatch({
  type: 'GENERATION',
  payload: { generationId: 'foo', expiration: 'bar' }
});

console.log(store.getState());

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
