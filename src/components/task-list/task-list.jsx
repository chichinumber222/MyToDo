import React from 'react';
import PropTypes from 'prop-types';
import Task from '../task';
import './task-list.css';

const TaskList = ({ todoData, tab, ...handleForTask }) => {
  const todoWithTab =
    tab === 'all' ? todoData : todoData.filter((item) => item.condition === tab || item.condition === 'editing');

  const elements = todoWithTab.map((item) => {
    const { id } = item;
    return <Task key={id} {...item} {...handleForTask} />;
  });

  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tab: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
};

export default TaskList;
