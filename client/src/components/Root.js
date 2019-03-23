import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import Auth from './Auth';

class Root extends Component {
  render() {
    return this.props.account.loggedIn ? <Home /> : <Auth />;
  }
}

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
