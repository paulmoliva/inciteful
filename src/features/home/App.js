import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as userActions from '../user/redux/actions';
import NavBar from './NavBar'

/*
  This is the root component of your app. Here you define the overall layout
  and the container of the react router.
  You should adjust it according to the requirement of your app.
*/
class App extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  componentDidMount() {
    const { actions } = this.props;
    if (window.localStorage.getItem('token')){
      actions.checkSession();
    }
  }

  render() {
    const { sessionChecked } = this.props;
    return (
      <div className="home-app">
        <div className="page-container">
          { sessionChecked ? 
            <React.Fragment>
              <NavBar />
              {this.props.children}
            </React.Fragment> :
            <div></div>
          }
          
        </div>
      </div>
    );
  }
}


/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    currentUser: state.user.currentUser,
    sessionChecked: state.user.sessionChecked,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
