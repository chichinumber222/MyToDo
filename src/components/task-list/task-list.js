import React from "react";
import Task from "../task";
import "./task-list.css";

class TaskList extends React.Component {
  render() {
    const { todoData, tab, markComplete, onDel } = this.props;
    const todoWithTab = tab === "all" ? todoData : todoData.filter((item) => item.condition === tab);

    const elements = todoWithTab.map((item) => {
      const { id } = item;
      return (
        <Task {...item} key={id} onMarkComplete={markComplete} onDel={onDel} />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
