import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

// MVP done

export default class AccountDragonRow extends Component {
  state = {
    nickname: this.props.dragon.nickname,
    isPublic: this.props.dragon.isPublic,
    saleValue: this.props.dragon.saleValue,
    sireValue: this.props.dragon.sireValue,
    edit: false
  };

  get SaveButton() {
    return <Button onClick={this.saveDragon}>Save</Button>;
  }

  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  saveDragon = () => {
    const {
      nickname, isPublic, saleValue, sireValue
    } = this.state;

    fetch('/dragon/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dragonId: this.props.dragon.dragonId,
        nickname,
        isPublic,
        saleValue,
        sireValue
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

  updateNickname = (e) => {
    this.setState({ nickname: e.target.value });
  };

  updateSaleValue = (e) => {
    this.setState({ saleValue: e.target.value });
  };

  updateSireValue = (e) => {
    this.setState({ sireValue: e.target.value });
  };

  updateIsPublic = (e) => {
    this.setState({ isPublic: e.target.checked });
  };

  toggleEdit = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  render() {
    return (
      <div>
        <div>
          <span>
            Nick Name:
            {'  '}
            <input
              type="text"
              value={this.state.nickname}
              onChange={this.updateNickname}
              disabled={!this.state.edit}
            />
            {'        '}
            Sale Value:
            {' '}
            <input
              type="number"
              disabled={!this.state.edit}
              value={this.state.saleValue}
              onChange={this.updateSaleValue}
            />
            Sire Value:
            {' '}
            <input
              type="number"
              disabled={!this.state.edit}
              value={this.state.sireValue}
              onChange={this.updateSireValue}
            />
            {' '}
            Public:
            <input
              type="checkbox"
              disabled={!this.state.edit}
              checked={this.state.isPublic}
              onChange={this.updateIsPublic}
            />
          </span>
          <div>{this.state.edit ? this.SaveButton : this.EditButton}</div>
        </div>
        <br />
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}
