/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

class NewTaskForm extends React.Component {
  state = {
    text: '',
    min: '',
    sec: '',
  };

  changeField = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }); 
  };

  submitForm = (event) => {
    event.preventDefault();
    const { text, min, sec } = this.state;
    const { add } = this.props;
    if (!text.trim()) return;

    add(text.trim(), ...this.format([min, sec]));
    this.setState({
      text: '',
      min: '',
      sec: '',
    });
  };

  format(arr) {
    return arr.map((element) => {
      const elementNum = Number(element);
      if (elementNum !== elementNum) elementNum = 0;      
      return elementNum;
    })
  }

  render() {
    const { text, min, sec } = this.state;

    return (
      <header className="header">
        <h1>todos</h1>
        <form className='new-todo-form' onSubmit={this.submitForm}>
          <input
            className="new-todo"
            placeholder="Task"
            name='text'
            onChange={this.changeField}
            value={text}
          />
          <input 
            className="new-todo-form__timer" 
            placeholder="Min" 
            name='min' 
            onChange={this.changeField} 
            value={min}
          />
          <input 
            className="new-todo-form__timer" 
            placeholder="Sec" 
            name='sec' 
            onChange={this.changeField} 
            value={sec}
          />
          <input type="submit" hidden />
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  add: PropTypes.func.isRequired,
};

export default NewTaskForm;
