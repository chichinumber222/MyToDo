import React from "react";
import "./new-task-form.css";

class NewTaskForm extends React.Component {
  state = {
    value: ''
  }

  changeField = (e) => {
    this.setState({
      value: e.target.value 
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.onAdd(this.state.value);
    this.setState({
      value: ''
    })
  }

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
    )
  } 
};

export default NewTaskForm;
