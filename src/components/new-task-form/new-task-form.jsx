import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  state = {
    value: '',
  };

  changeField = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
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
            autoFocus
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
