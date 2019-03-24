import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Generation from './Generation';
import Dragon from './Dragon';
import { logout } from '../actions/accountAction';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Button className="logout-button" onClick={this.props.logout}>
          Log Out
        </Button>
        <Generation />
        <Dragon />
      </div>
    );
  }
}

// fetch('http://localhost:3001/account/dragons', {
//   credentials: 'include'
// })
//   .then(res => res.json())
//   .then(data => console.log(data));

export default connect(
  null,
  { logout }
)(Home);
