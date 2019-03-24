import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

export default class AccountDragonRow extends Component {
  state = {
    nickname: this.props.dragon.nickname,
    edit: false
  };

  updateNickname = (e) => {
    this.setState({ nickname: e.target.value });
  };

  saveNickname = () => {
    fetch('http://localhost:3001/dragon/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname: this.state.nickname
      })
    })
      .then(res => res.json())
      .then((json) => {
        if (json.type === 'error') {
          alert(json.message);
        } else {
          this.toggleEdit();
        }
      })
      .catch(err => console.log(err));
  };

  get SaveButton() {
    return <Button onClick={this.saveNickname}>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  toggleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.nickname}
          onChange={this.updateNickname}
          disabled={!this.state.edit}
        />
        {'        '}
        {this.state.edit ? this.SaveButton : this.EditButton}
        <br />
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}
