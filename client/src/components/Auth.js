import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

export default class Auth extends Component {
  state = {
    username: '',
    password: ''
  };

  updateInput = (value, type) => {
    this.setState({
      ...this.state,
      [type]: value
    });
  };

  signup = () => {
    console.log(this.state);
  };

  login = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div>
        <h2>Dragon Stack</h2>
        <FormGroup>
          <FormControl
            type="text"
            value={this.state.username}
            placeholder="User Name"
            onChange={event => this.updateInput(event.target.value, 'username')}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={event => this.updateInput(event.target.value, 'password')}
          />
        </FormGroup>
        <div>
          <Button onClick={this.login}>Log In</Button>
          <span> or </span>
          <Button onClick={this.signup}>Sign Up</Button>
        </div>
      </div>
    );
  }
}
