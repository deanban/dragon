import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPublicDragons } from '../actions/publicDragonAction';

import PublicDragonRow from './PublicDragonRow';

export class PublicDragons extends Component {
  componentDidMount() {
    this.props.fetchPublicDragons();
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
      </div>
    );
  }
}

export default connect(
  ({ publicDragons }) => ({ publicDragons }),
  { fetchPublicDragons }
)(PublicDragons);
