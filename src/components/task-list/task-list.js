import React from "react";
import Task from "../task";
import "./task-list.css";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    return (
      <li className={item.state} key={item.id}>
        <Task text={item.text} />
        <input type="text" className="edit" value={item.text} />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
