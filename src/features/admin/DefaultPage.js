import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as myActions from './redux/actions';
import * as categoryActions from '../categories/redux/actions';

export class DefaultPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {name: '', description: ''};

  componentDidMount() {
    this.props.actions.fetchCategories();
  }

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { allCategories, actions } = this.props;
    return (
      <div className="admin-default-page">
        <div className="signup-box">
          <h3>New Category</h3>
          <input value={this.state.name} type="text" placeholder="Name" onChange={this.handleChange.bind(this, 'name')}/>
          <textarea 
            value={this.state.description} 
            onChange={this.handleChange.bind(this, 'description')} 
            placeholder="Description"
            rows="4"
          />
          <button onClick={() => actions.createCategory({ name: this.state.name, description: this.state.description})}>
            Submit
          </button>
        </div>
        <div>
          <h3>All Categories</h3>
          <ul>
            {allCategories.map( category => <li key={category.id}>{category.name}</li>)}
          </ul>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    admin: state.admin,
    allCategories: state.categories.allCategories,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...myActions, ...categoryActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultPage);
