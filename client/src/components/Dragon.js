import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import DragonAvatar from './DragonAvatar';
import { fetchNewDragon } from '../actions/dragonAction';

class Dragon extends Component {
  componentDidMount() {
    this.props.fetchNewDragon();
  }

  get DragonView() {
    const { dragon } = this.props;
    // if (dragon.error !== '') {
    //   return (
    //     <span>
    //       <h6>You already have a dragon from this generation.</h6>
    //     </span>
    //   );
    // }
    return <DragonAvatar dragon={dragon} />;
  }

  render() {
    return (
      <div>
        <Button onClick={this.props.fetchNewDragon}>New Dragon</Button>
        {this.DragonView}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dragon: state.dragon.dragon
});

export default connect(
  mapStateToProps,
  { fetchNewDragon }
)(Dragon);
