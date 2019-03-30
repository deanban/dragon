import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPublicDragons } from '../actions/publicDragonAction';
import { fetchAccountDragons } from '../actions/accountDragonsAction';

import PublicDragonRow from './PublicDragonRow';

export class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();

    // adding a call to fetchAccountDragons so the user
    // doesn't have to refresh accountDragons page to load the new
    // dragons to redux store for the sire service.
    this.props.fetchAccountDragons();
  }

  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <hr />
        <br />
        <h3>Public Dragons</h3>
        <br />
        {this.props.publicDragons.dragons.map(dragon => (
          <div key={dragon.dragonId}>
            <PublicDragonRow dragon={dragon} />
            <hr />
          </div>
        ))}
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default connect(
  ({ publicDragons }) => ({ publicDragons }),
  { fetchPublicDragons, fetchAccountDragons }
)(PublicDragons);
