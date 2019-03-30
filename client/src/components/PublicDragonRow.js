/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import history from '../history';
import DragonAvatar from './DragonAvatar';
import MatingOptions from './MatingOptions';

export default class PublicDragonRow extends Component {
  state = {
    displayMatingOptions: false
  };

  toggleMatingOptions = () => {
    this.setState(({ displayMatingOptions }) => ({
      displayMatingOptions: !displayMatingOptions
    }));
  };

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
        <div>
          <span>Sale Value: {this.props.dragon.saleValue}</span> {'  |  '}
          <span>Sire Value: {this.props.dragon.sireValue}</span>
        </div>
        <div>
          <Button onClick={this.buyDragon}>Buy</Button>{' '}
          <Button onClick={this.toggleMatingOptions}>Sire</Button>
          <br />
          {this.state.displayMatingOptions ? (
            <div style={{ marginTop: '15px' }}>
              <MatingOptions patronDragonId={this.props.dragon.dragonId} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
