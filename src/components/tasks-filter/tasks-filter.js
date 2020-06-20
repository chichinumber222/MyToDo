import React from "react";
import "./tasks-filter.css";
import PropTypes from 'prop-types';

const TasksFilter = ({ onTab, tab }) => {
  
  function createButton(n, fn, text) {
    return (
      <button
        name={n}
        className={tab === n ? "selected" : ""}
        onClick={(e) => fn(e.target.name)}
      >
        {text}
      </button>
    );
  }

  return (
    <ul className="filters">
      <li>{createButton("all", onTab, "All")}</li>
      <li>{createButton("active", onTab, "Active")}</li>
      <li>{createButton("completed", onTab, "Completed")}</li>
    </ul>
  );
};

TasksFilter.propTypes = {
  onTab: PropTypes.func.isRequired,
  tab: PropTypes.oneOf(["all", "active", "completed"]).isRequired,
};

export default TasksFilter;
