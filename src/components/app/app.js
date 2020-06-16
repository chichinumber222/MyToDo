import React from "react";
import NewTaskForm from "../new-task-form";
import TaskList from "../task-list";
import Footer from "../footer";
import "./app.css";

class App extends React.Component {
  maxId = 100;
  state = {
    todoData: [
      this.createTask('task №1'),
      this.createTask('task №2'),
      this.createTask('task №3'),
    ],
    tab: 'all'
  };
  onMarkComplete = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];

      const newCondition = oldItem.condition === "completed" ? 'active' : "completed";
      const newItem = {...oldItem, condition: newCondition};

      const newArray = [
        ...todoData.slice(0, index),
        newItem,
        ...todoData.slice(index + 1)
      ]
      return {
        todoData: newArray
      }
    })
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
  onAdd = (text) => {
    const item = this.createTask(text);
    this.setState(({ todoData }) => {
      const newArray = [item, ...todoData];
      return {
        todoData: newArray
      }
    })
  }
  onTab = (name) => {
    this.setState({
      tab: name
    })
  }
  onDeleteCompleted = () => {
    this.setState(({todoData}) => {
      const newArray = todoData.filter((item) => item.condition !== 'completed');
      return {
        todoData: newArray
      }
    })
  }

  createTask(text) {
    return {
      condition: 'active',
      text,
      id: this.maxId++
    }
  }

  render() {
    const { todoData } = this.state;

    return (
      <section className="todoapp">
        <NewTaskForm onAdd={this.onAdd}/>
        <section className="main">
          <TaskList
            {...this.state}
            markComplete={this.onMarkComplete}
            onDel={this.onDelete}
          />
          <Footer todos={todoData} onTab={this.onTab} deleteCompleted={this.onDeleteCompleted}/>
        </section>
      </section>
    );
  }
}

export default App;
