import React from "react";
import Task from "../task";
import "./task-list.css";

class TaskList extends React.Component {
  render() {
    const { todos, markComplete, onDel } = this.props;

    const elements = todos.map((item) => {
      const { id } = item;
      return (
        <Task {...item} key={id} onMarkComplete={markComplete} onDel={onDel} />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
