import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import DragonAvatar from './DragonAvatar';
import { fetchNewDragon } from '../actions/dragonAction';

class Dragon extends Component {
  componentDidMount() {
    this.props.fetchNewDragon();
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.fetchNewDragon}>New Dragon</Button>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dragon: state.dragon.dragon
});

export default connect(
  mapStateToProps,
  { fetchNewDragon }
)(Dragon);
