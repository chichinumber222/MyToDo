import React from "react";
import Task from "../task";
import "./task-list.css";

class TaskList extends React.Component {
  render() {
    const { todoData, tab, ...forTask } = this.props;
    const todoWithTab =
      tab === "all"
        ? todoData
        : todoData.filter((item) => item.condition === tab);

    const elements = todoWithTab.map((item) => {
      const { id } = item;
      return <Task {...item} key={id} {...forTask} />;
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
