import React, { Component } from 'react';

import Generation from './Generation';
import Dragon from './Dragon';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Generation />
        <Dragon />
      </div>
    );
  }
}
