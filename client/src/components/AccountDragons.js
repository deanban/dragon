import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchAccountDragons } from '../actions/accountDragonsAction';

import AccountDragonRow from './AccountDragonRow';

class AccountDragons extends Component {
  componentDidMount() {
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <hr />
        <br />
        <h3>Account Dragons</h3>

        <br />
        {this.props.accountDragons.dragons.map(dragon => (
          <div key={dragon.dragonId}>
            <AccountDragonRow dragon={dragon} />
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

AccountDragons.propTypes = {
  accountDragons: PropTypes.object.isRequired,
  fetchAccountDragons: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  accountDragons: state.accountDragons
});

export default connect(
  mapStateToProps,
  { fetchAccountDragons }
)(AccountDragons);
