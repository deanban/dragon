/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragonAvatar from './DragonAvatar';

export default class PublicDragonRow extends Component {
  render() {
    return (
      <div>
        <div>Name: {this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>Sale Value: {this.props.dragon.saleValue}</div>
      </div>
    );
  }
}
