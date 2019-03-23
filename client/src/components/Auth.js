import React, { Component } from 'react';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../actions/accountAction';

class Auth extends Component {
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
    // console.log(this.state);
    const { username, password } = this.state;
    this.props.signup({ username, password });
  };

  login = () => {
    console.log(this.state);
  };

  get Error() {
    const { status, error } = this.props.account;
    if (
      status === 'failed'
      && error === 'Unexpected token < in JSON at position 0'
    ) {
      return (
        <div>
          <h3>Username Already Exists</h3>
        </div>
      );
    }
  }

  render() {
    // console.log(this.props.account);
    const { username, password } = this.state;
    return (
      <div>
        <h2>Dragon Stack</h2>
        <FormGroup>
          <FormControl
            type="text"
            value={username}
            placeholder="User Name"
            onChange={event => this.updateInput(event.target.value, 'username')}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            value={password}
            placeholder="Password"
            onChange={event => this.updateInput(event.target.value, 'password')}
          />
        </FormGroup>
        <div>
          <Button onClick={this.login}>Log In</Button>
          <span> or </span>
          <Button onClick={this.signup}>Sign Up</Button>
        </div>
        <br />
        {this.Error}
      </div>
    );
  }
}

Auth.propTypes = {
  account: PropTypes.object.isRequired,
  signup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(
  mapStateToProps,
  { signup }
)(Auth);
