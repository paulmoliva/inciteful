import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Login extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
    email: '',
    password: '',
  }

  handleChange(name, event) {
    this.setState({[name]: event.target.value});
  }

  render() {
    const { email, password } = this.state;
    const { loginUser } = this.props.actions;
    return (
      <div className="user-signup">
        <div className="signup-box">
          <h3>Log In</h3>
          <input type="email" value={this.state.email} placeholder="Email" onChange={this.handleChange.bind(this, 'email')} />
          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handleChange.bind(this, 'password')} />
          <button onClick={() => loginUser({ email, password })}>Log In</button>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
