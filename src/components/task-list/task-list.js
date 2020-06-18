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
    const { todoData, tab, ...forTask } = this.props;
    const todoWithTab =
      tab === "all"
        ? todoData
        : todoData.filter((item) => item.condition === tab);

    const elements = todoWithTab.map((item) => {
      const { id } = item;
      return <Task key={id} {...item}  {...forTask} />;
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

export default TaskList;
