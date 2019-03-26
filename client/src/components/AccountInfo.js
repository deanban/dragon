import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAccountInfo } from '../actions/accountInfoAction';

export class AccountInfo extends Component {
  componentDidMount() {
    this.props.fetchAccountInfo();
  }

  render() {
    const { username, balance } = this.props.accountInfo;
    return (
      <div>
        <h3>Account Info</h3>

        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <div>Username: {username} </div>
        {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
        <div>Balance: {balance} </div>
      </div>
    );
  }
}

export default connect(
  ({ accountInfo }) => ({ accountInfo }),
  { fetchAccountInfo }
)(AccountInfo);
