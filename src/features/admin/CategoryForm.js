import React from 'react';

class CategoryForm extends React.Component {

  state = {name: '', description: ''};

  handleChange(name, e) {
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const { categoryAction } = this.props;
    return (
      <div className="signup-box">
        <h3>New Category</h3>
        <input value={this.state.name} type="text" placeholder="Name" onChange={this.handleChange.bind(this, 'name')}/>
        <textarea
          value={this.state.description}
          onChange={this.handleChange.bind(this, 'description')}
          placeholder="Description"
          rows="4"
        />
        <button
          onClick={() => {
            categoryAction({ name: this.state.name, description: this.state.description});
            this.setState({
              name: '',
              description: '',
            });
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default CategoryForm;
