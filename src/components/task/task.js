import React from "react";
import "./task.css";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

class Task extends React.Component {
  render() {
    const { condition, id, text, markComplete, del, time } = this.props;
    const check = condition === "completed" ? true : false;
    const timeAgo = formatDistanceToNow(time, { includeSeconds: true });

    return (
      <li className={condition}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => markComplete(id)}
            checked={check}
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

// test commit