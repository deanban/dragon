import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

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

  // componentWillUpdate(prevState) {
  //   if (prevState.generationId !== this.state.generationId) {
  //     this.fetchDragon();
  //   }
  // }

  // componentWillUnmount() {
  //   clearTimeout(this.timer);
  // }

  fetchDragon = () => {
    fetch('http://localhost:3001/dragon/new')
      .then(res => res.json())
      .then((json) => {
        // console.log(json);
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
    return (
      <div>
        <Button onClick={this.fetchDragon}>New Dragon</Button>
        <DragonAvatar dragon={this.state} />
      </div>
    );
  }
}

export default Dragon;
