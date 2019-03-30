/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';

class MatingOptions extends Component {
  // mate can't be called immediately
  mate = ({ matronDragonId, patronDragonId }) => () => {
    fetch('/dragon/mate', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matronDragonId, patronDragonId })
    })
      .then(res => res.json())
      .then((json) => {
        alert(json.message);

        if (json.type === 'error') history.push('/account-dragons');
      })
      .catch(err => alert(err.message));
  };

  render() {
    return (
      <div>
        <h4>Pick one of your dragons to mate with:</h4>
        {this.props.accountDragons.dragons.map((dragon) => {
          const { dragonId, generationId, nickname } = dragon;

          return (
            <span key={dragonId}>
              <Button
                onClick={this.mate({
                  patronDragonId: this.props.patronDragonId,
                  matronDragonId: dragonId
                })}
              >
                G{generationId}.I{dragonId}. {nickname}
              </Button>{' '}
            </span>
          );
        })}
      </div>
    );
  }
}

export default connect(
  ({ accountDragons }) => ({ accountDragons }),
  null
)(MatingOptions);
