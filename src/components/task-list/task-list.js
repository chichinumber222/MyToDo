import React from "react";
import Task from "../task";
import "./task-list.css";
import PropTypes from 'prop-types';

class TaskList extends React.Component {
  
  static propTypes = {
    todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
    tab: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  }

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
