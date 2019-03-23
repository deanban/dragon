import React, { Component } from 'react';
import Home from './Home';
import Auth from './Auth';

export default class Root extends Component {
  render() {
    return false ? <Home /> : <Auth />;
  }
}
