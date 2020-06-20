import React from "react";
import "./task.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from 'prop-types';

class Task extends React.Component {
  
  static propTypes = {
    condition: PropTypes.oneOf(['active', 'completed', 'editing']).isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    markComplete: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
  }
  
  values = {
    prevCondition: '',
    flag: true,
  }

  state = {
    currentText: ''
  };

  editInput = React.createRef();

  editFn = (e) => {
    this.setState({
      currentText: this.props.text
    });
    this.values.prevCondition = this.props.condition;
    this.props.edit(this.props.id, { "condition": "editing" }, this.editInput.current);
  };
  editFnBlur = () => {
    if (this.values.flag) {
      const id = this.props.id;
      const condition = this.values.prevCondition;
      const text = this.props.text;
      this.props.edit(id, { 'condition': condition, 'text': text })
    }
    this.values.flag = true;
  };
  changeField = (e) => {
    this.setState({ currentText: e.target.value });
  };
  submit = (e) => {
    e.preventDefault();
    this.values.flag = false;
    const id = this.props.id;
    const condition = this.values.prevCondition;
    const text = this.state.currentText;
    this.props.edit(id, { 'condition': condition, 'text': text });
  }

  render() {
    const { condition, id, text, markComplete, del, time } = this.props;
    const timeAgo = formatDistanceToNow(time, { includeSeconds: true });

    return (
      <li className={condition}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => markComplete(id)}
            checked={condition === "completed" ? true : false}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">{timeAgo} ago</span>
          </label>
          <button
            className="icon icon-edit"
            onClick={this.editFn}
          ></button>
          <button id="des"
            className="icon icon-destroy"
            onClick={() => del(id)}
          ></button>
        </div>
        <form onSubmit={this.submit}>
          <input
            ref={this.editInput}
            className="edit"
            value={this.state.currentText}
            onChange={this.changeField}
            onBlur={this.editFnBlur}
          />
        </form>
      </li>
    );
  }
}

export default Task;
