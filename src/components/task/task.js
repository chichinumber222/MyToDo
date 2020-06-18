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
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => del(id)}
          ></button>
        </div>
        <input type="text" className="edit" defaultValue={text} />
      </li>
    );
  }
}

export default Task;
