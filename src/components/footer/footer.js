import React from "react";
import TasksFilter from "../tasks-filter";
import "./footer.css";

const Footer = ({ todos }) => {
  const count = todos.reduce((acc, item) => {
    if (item.condition !== "completed") acc++;
    return acc;
  }, 0);

  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  );
};

export default Footer;
