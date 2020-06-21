import React from 'react';
import PropTypes from 'prop-types';
import TasksFilter from '../tasks-filter';
import './footer.css';

const Footer = ({ todoData, deleteCompleted, tab, onTab }) => {
  const count = todoData.filter((el) => el.condition !== 'completed').length;

  return (
    <footer className="footer">
      <span className="todo-count">
        {count}
        items left
      </span>
      <TasksFilter tab={tab} onTab={onTab} />
      <button type="button" className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCompleted: PropTypes.func.isRequired,
  tab: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  onTab: PropTypes.func.isRequired,
};

export default Footer;
