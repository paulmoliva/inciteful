import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from './redux/actions';
import * as userActions from '../user/redux/actions';

export class NavBar extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { currentUser } = this.props;
    return (
      <div className="home-nav-bar">
          {
            currentUser ?
            <nav>
              <div>
                {currentUser.admin ? <Link to="/admin">Admin</Link> : null}
              </div>
              <div>
                <span>Logged in as {currentUser.email} </span>
                <button onClick={this.props.actions.logOutUser}>Log Out</button>
              </div>
            </nav> :
            <nav>
              <Link to='/user/signup'>Sign Up</Link> |
              <Link to='/user/login'> Login</Link>
            </nav>
          }
        
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    currentUser: state.user.currentUser,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, ...userActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
