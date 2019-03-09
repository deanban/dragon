import React, { Component } from 'react';

class Dragon extends Component {
  state = {
    generationId: '',
    dragonId: '',
    traits: []
  };

  // timer = null;

  componentDidMount() {
    this.fetchDragon();
  }

  // componentWillUnmount() {
  //   clearTimeout(this.timer);
  // }

  fetchDragon = () => {
    fetch('http://localhost:3001/dragon/new')
      .then(res => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          generationId: json.dragon.generationId,
          dragonId: json.dragon.dragonId,
          traits: json.dragon.traits
        });
      })
      .catch(err => console.log(err));
  };

  // fetchNextGeneration = () => {
  //   const { minDelay, expiration } = this.state;
  //   this.fetchGeneration();

  //   let delay = new Date(expiration).getTime() - new Date().getTime();

  //   if (delay < minDelay) {
  //     delay = minDelay;
  //   }

  //   this.timer = setTimeout(() => {
  //     this.fetchNextGeneration();
  //   }, delay);
  // };

  render() {
    const { generationId, dragonId, traits } = this.state;
    return (
      <div>
        <span>
          Generation:
          {generationId}
        </span>
        <span>
          Dragon:
          {dragonId}
        </span>
        {traits.map(trait => trait.traitValue).join(', ')}
      </div>
    );
  }
}

export default Dragon;
