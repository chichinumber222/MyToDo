import React from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

const App = () => {
  const todoData = [
    { state: "completed", text: "Completed task", id: 1 },
    { state: "editing", text: "Editing task", id: 2 },
    { state: null, text: "Active task", id: 3 },
  ];

  return (
    <section className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer todos={todoData} />
      </section>
    </section>
  );
};

export default App;
