/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  state = {
    value: '',
  };

  changeField = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  submitForm = (event) => {
    event.preventDefault();
    if (!this.state.value.trim()) {
      return;
    }
    this.props.add(this.state.value);
    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.submitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.value}
            onChange={this.changeField}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  add: PropTypes.func.isRequired,
};

export default NewTaskForm;
