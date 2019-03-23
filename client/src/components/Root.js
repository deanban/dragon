import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Home from './Home';
import Auth from './Auth';

import { fetchAuthenticated } from '../actions/accountAction';

class Root extends Component {
  componentDidMount() {
    this.props.fetchAuthenticated();
  }

  render() {
    const { loggedIn } = this.props.account;
    return loggedIn ? <Home /> : <Auth />;
  }
}

Root.propTypes = {
  loggedIn: PropTypes.bool,
  account: PropTypes.object.isRequired,
  fetchAuthenticated: PropTypes.func.isRequired
};

export default connect(
  ({ account }) => ({ account }),
  { fetchAuthenticated }
)(Root);
