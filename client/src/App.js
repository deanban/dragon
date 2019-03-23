import React, { Component } from 'react';
import { Provider } from 'react-redux';

import './App.css';

// import Generation from './components/Generation';
import Root from './components/Root';

import store from './store/store';

// const store = createStore(generationReducer);

// store.dispatch({
//   type: 'GENERATION',
//   payload: { generationId: 'foo', expiration: 'bar' }
// });

// console.log(store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Root />
        </div>
      </Provider>
    );
  }
}

export default App;
