import React from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

class App extends React.Component {
  state = {
    todoData: [
      { condition: "completed", text: "task №1", id: 1 },
      { condition: "editing", text: "task №2", id: 2 },
      { condition: null, text: "task №3", id: 3 },
    ],
  };
  onMarkComplete = (id) => {
    this.setState(({ todoData }) => {
      const item = todoData.find((el) => el.id === id);
      const newCondition = item.condition === "completed" ? null : "completed";
      const newItem = { ...item, condition: newCondition };

      const newArray = todoData.reduce((acc, item) => {
        item.id === id ? acc.push(newItem) : acc.push(item);
        return acc;
      }, []);

      return {
        todoData: newArray,
      };
    });
  };
  onDelete = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [
        ...todoData.slice(0, index),
        ...todoData.slice(index + 1),
      ];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList
            todos={todoData}
            markComplete={this.onMarkComplete}
            onDel={this.onDelete}
          />
          <Footer todos={todoData} />
        </section>
      </section>
    );
  }
}

export default App;
