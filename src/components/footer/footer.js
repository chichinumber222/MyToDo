import React from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({ todoData, deleteCompleted, ...tabs }) => {
  const count = todoData.filter((el) => el.condition !== "completed").length;

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter {...tabs} />
      <button className="clear-completed" onClick={deleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  todoData: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteCompleted: PropTypes.func.isRequired,
};

export default Footer;
