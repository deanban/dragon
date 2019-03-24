import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
  Router, Switch, Route, Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';

import store from './store/store';

import Root from './components/Root';
import AccountDragons from './components/AccountDragons';

// const store = createStore(generationReducer);

// store.dispatch({
//   type: 'GENERATION',
//   payload: { generationId: 'foo', expiration: 'bar' }
// });

// console.log(store.getState());

const history = createBrowserHistory();

const AuthRouteHOC = (props) => {
  if (!store.getState().account.loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  const { component, path } = props;

  return <Route exact path={path} component={component} />;
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Root} />
              <AuthRouteHOC
                path="/account-dragons"
                component={AccountDragons}
              />
            </Switch>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
