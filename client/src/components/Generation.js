import React, { Component } from 'react';

class Generation extends Component {
  state = {
    generationId: '',
    expiration: '',
    minDelay: 3000
  };

  timer = null;

  componentDidMount() {
    this.fetchNextGeneration();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  fetchGeneration = () => {
    fetch('http://localhost:3001/dragon/generation')
      .then(res => res.json())
      .then((json) => {
        this.setState({
          generationId: json.generation.generationId,
          expiration: json.generation.expiration
        });
      });
  };

  fetchNextGeneration = () => {
    const { minDelay, expiration } = this.state;
    this.fetchGeneration();

    let delay = new Date(expiration).getTime() - new Date().getTime();

    if (delay < minDelay) {
      delay = minDelay;
    }

    this.timer = setTimeout(() => {
      this.fetchNextGeneration();
    }, delay);
  };

  render() {
    const { generationId, expiration } = this.state;
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

export default Generation;
