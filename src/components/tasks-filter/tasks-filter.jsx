import React from 'react';
import './tasks-filter.css';
import PropTypes from 'prop-types';

const TasksFilter = ({ onTab, tab }) => {
  function createButton(name, fn, text) {
    return (
      <button
        type="button"
        name={name}
        className={tab === name ? 'selected' : ''}
        onClick={(event) => fn(event.target.name)}
      >
        {text}
      </button>
    );
  }

  return (
    <ul className="filters">
      <li>{createButton('all', onTab, 'All')}</li>
      <li>{createButton('active', onTab, 'Active')}</li>
      <li>{createButton('completed', onTab, 'Completed')}</li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onTab: PropTypes.func.isRequired,
  tab: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
};

export default TasksFilter;
