import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './Home';
import Auth from './Auth';

class Root extends Component {
  render() {
    const { loggedIn } = this.props.account;
    return loggedIn ? <Home /> : <Auth />;
  }
}

Root.propTypes = {
  loggedIn: PropTypes.bool,
  account: PropTypes.object.isRequired
};

export default connect(
  ({ account }) => ({ account }),
  null
)(Root);
