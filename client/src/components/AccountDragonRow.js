import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragonAvatar from './DragonAvatar';

export default class AccountDragonRow extends Component {
  render() {
    return (
      <div>
        <div>{this.props.dragon.nickname}</div>
        <br />
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}
