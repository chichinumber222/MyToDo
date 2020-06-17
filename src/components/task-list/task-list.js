import React from "react";
import Task from "../task";
import "./task-list.css";

class TaskList extends React.Component {
  render() {
    const { todoData, tab, ...handleForTask } = this.props;
    const todoWithTab =
      tab === "all"
        ? todoData
        : todoData.filter(
            (item) => item.condition === tab || item.condition === "editing"
          );

    const elements = todoWithTab.map((item) => {
      const { id } = item;
      return <Task {...item} key={id} {...handleForTask} />;
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
