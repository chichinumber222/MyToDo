import React from "react";
import "./task.css";

class Task extends React.Component {
  render() {
    const { condition, id, text, onMarkComplete, onDel } = this.props;
    const check = condition === 'completed' ? true : false;

    return (
      <li className={condition}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={() => onMarkComplete(id)}
            checked={check}
          />
          <label>
            <span className="description">{text}</span>
            <span className="created">created 17 seconds ago</span>
          </label>
          <button className="icon icon-edit"></button>
          <button
            className="icon icon-destroy"
            onClick={() => onDel(id)}
          ></button>
        </div>
        <input type="text" className="edit" defaultValue={text} />
      </li>
    );
  }
}

export default Task;
