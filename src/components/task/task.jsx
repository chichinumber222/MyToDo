import React from 'react';
import './task.css';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import WorkWithDate from '../../services/work-with-date';

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
    const { currentText } = this.state;
    const { id, edit } = this.props;
    const { prevCondition } = this.values;

    if (!currentText.trim()) return;
    this.values.flag = false;
    edit(id, { condition: prevCondition, text: currentText.trim() });
  };

  changeTime() {
    const { time } = this.props;
    return formatDistanceToNow(time, { includeSeconds: true, addSuffix: true });
  }

  render() {
    const { condition, id, text, markComplete, del, timerOn, timerOff, alreadyTime } = this.props;
    const { timeAgo, currentText } = this.state;
    const alreadyTimeFormat = new WorkWithDate(...alreadyTime).recountMinuteSecond().transformToText().result();


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
            <span className="title">{text}</span>
            <span className="description">
              <button 
                type="button" 
                className="icon icon-play" 
                aria-label="play"
                onClick={() => timerOn(id)} 
              />
              <button 
                type="button" 
                className="icon icon-pause" 
                aria-label="pause" 
                onClick={() => timerOff(id)}
              />
              {alreadyTimeFormat}
            </span>
            <span className="description">{timeAgo}</span>
          </label>
          <button 
            type="button" 
            className="icon icon-edit" 
            onClick={this.editFn} 
            aria-label="edit" 
          />
          <button 
            type="button" 
            className="icon icon-destroy" 
            onClick={() => del(id)} 
            aria-label="delete" 
          />
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
  timerOn: PropTypes.func.isRequired,
  timerOff: PropTypes.func.isRequired,
  alreadyTime: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Task;
