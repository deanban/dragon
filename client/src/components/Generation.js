import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGeneration } from '../actions/generationAction';

class Generation extends Component {
  state = {
    minDelay: 3000
  };

  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchNextGeneration = () => {
    const { minDelay } = this.state;
    const { expiration } = this.props.generation;
    const { getGeneration } = this.props;

    getGeneration();

    let delay = new Date(expiration).getTime() - new Date().getTime();

    if (delay < minDelay) {
      delay = minDelay;
    }

    this.timer = setTimeout(() => {
      this.fetchNextGeneration();
    }, delay);
  };

  render() {
    const { generationId, expiration } = this.props.generation;
    return (
      <div>
        <h3>
          Generation:
          {generationId}
        </h3>
        <h4>
          Expires on:
          {new Date(expiration).toLocaleString()}
        </h4>
      </div>
    );
  }
}

const mapStatetoProps = state => ({ generation: state.generation.generation });

export default connect(
  mapStatetoProps,
  { getGeneration }
)(Generation);
