import React from "react";
import "./task.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

class Task extends React.Component {
  state = {
    previousCondition: '',
    previousText: '',
    flag: true,
    currentText: ''
  };

  editInput = React.createRef();

  editFn = (e) => {
    this.setState({
      previousCondition: this.props.condition,
      previousText: this.props.text,
      currentText: this.props.text
    });
    this.props.edit(this.props.id, {"condition": "editing"});
    setTimeout(() => this.editInput.current.focus(), 0)
  };
  editFnBlur = () => {
    if (this.state.flag) {
      const id = this.props.id;
      const prevCondition = this.state.previousCondition;
      const prevText = this.state.previousText;
      this.props.edit(id, {'condition': prevCondition, 'text': prevText})
    }
    this.setState({flag: true});
  };
  changeField = (e) => {
    this.setState({currentText: e.target.value});
  };
  submit = (e) => {
    e.preventDefault();
    this.setState({flag: false});
    const id = this.props.id;
    const prevCondition = this.state.previousCondition;
    const currentText = this.state.currentText;
    this.props.edit(id, {'condition': prevCondition, 'text': currentText});
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
