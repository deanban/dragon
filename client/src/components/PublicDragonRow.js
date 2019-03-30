/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import history from '../history';
import DragonAvatar from './DragonAvatar';

export default class PublicDragonRow extends Component {
  buyDragon = () => {
    const { dragonId, saleValue } = this.props.dragon;
    fetch('/dragon/buy', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dragonId, saleValue })
    })
      .then(res => res.json())
      .then((json) => {
        alert(json.message);

        if (json.type !== 'error') history.push('/account-dragons');
      })
      .catch(err => alert(err.message));
  };

  render() {
    return (
      <div>
        <div>Name: {this.props.dragon.nickname}</div>
        <DragonAvatar dragon={this.props.dragon} />
        <div>Sale Value: {this.props.dragon.saleValue}</div>
        <div>
          <Button onClick={this.buyDragon}>Buy</Button>
        </div>
      </div>
    );
  }
}
