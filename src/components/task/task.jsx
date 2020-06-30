import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';

class Task extends React.Component {
  values = {
    prevCondition: '',
    flag: true,
    timerId: null,
  };

  editInput = React.createRef();

  state = {
    currentText: '',
    timeAgo: this.changeTime(),
  };

  componentDidMount() {
    this.values.timerId = setTimeout(
      function run() {
        const time = this.changeTime();
        this.setState({ timeAgo: time });
        if (time.includes('second')) {
          this.values.timerId = setTimeout(run.bind(this), 5000);
        } else {
          this.values.timerId = setTimeout(run.bind(this), 30000);
        }
      }.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    clearTimeout(this.values.timerId);
  }

  editFn = () => {
    const { condition, text, id, edit } = this.props;
    this.setState({
      currentText: text,
    });
    this.values.prevCondition = condition;
    edit(id, { condition: 'editing' }, this.editInput.current);
  };

  editFnBlur = () => {
    const { id, text, edit } = this.props;
    if (this.values.flag) {
      const condition = this.values.prevCondition;
      edit(id, { condition, text });
    }
    this.values.flag = true;
  };

  changeField = (event) => {
    this.setState({ currentText: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line react/destructuring-assignment
    if (!this.state.currentText.trim()) return;
    this.values.flag = false;
    const { id, edit } = this.props;
    // eslint-disable-next-line react/destructuring-assignment
    const text = this.state.currentText;
    const condition = this.values.prevCondition;
    edit(id, { condition, text });
  };

  changeTime() {
    const { time } = this.props;
    return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
  }

  render() {
    const { condition, id, text, markComplete, del } = this.props;
    const { timeAgo, currentText } = this.state;

    return (
      <li className={condition}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => markComplete(id)}
            checked={condition === 'completed'}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">{timeAgo}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.editFn} aria-label="edit" />
          <button type="button" className="icon icon-destroy" onClick={() => del(id)} aria-label="delete" />
        </div>
        <form onSubmit={this.submit}>
          <input
            ref={this.editInput}
            className="edit"
            value={currentText}
            onChange={this.changeField}
            onBlur={this.editFnBlur}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  condition: PropTypes.oneOf(['active', 'completed', 'editing']).isRequired,
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  edit: PropTypes.func.isRequired,
  markComplete: PropTypes.func.isRequired,
  del: PropTypes.func.isRequired,
  time: PropTypes.instanceOf(Date).isRequired,
};

export default Task;
