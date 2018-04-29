import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as myActions from './redux/actions';
import * as categoryActions from '../categories/redux/actions';
import CategoryForm from './CategoryForm';

export class DefaultPage extends Component {
  static propTypes = {
    admin: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.actions.fetchCategories();
  }

  render() {
    const { allCategories, actions } = this.props;
    return (
      <div className="admin-default-page">
        <CategoryForm categoryAction={actions.createCategory} />
        <div>
          <h3>All Categories</h3>
          <ul>
            {allCategories.map( category => (
              <li key={category.id}>
                <Link to={`admin/categories/${category.id}`}>{category.name}</Link>
              </li>
              )
            )}
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
