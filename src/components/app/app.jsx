import React from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

class App extends React.Component {
  maxId = 100;

  state = {
    todoData: [],
    tab: 'all',
  };

  onMarkComplete = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[index];

      const newCondition = oldItem.condition === 'completed' ? 'active' : 'completed';
      const newItem = { ...oldItem, condition: newCondition };

      const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onDelete = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];

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
        todoData: newArray,
      };
    });
  };

  onTab = (name) => {
    this.setState({
      tab: name,
    });
  };

  onDeleteCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => item.condition !== 'completed');
      return {
        todoData: newArray,
      };
    });
  };

  onEditing = (id, obj, elementDOM) => {
    this.setState(
      ({ todoData }) => {
        const index = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[index];
        const newItem = { ...oldItem, ...obj };
        const newArray = [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)];
        return {
          todoData: newArray,
        };
      },
      () => {
        if (elementDOM) elementDOM.focus();
      }
    );
  };

  createTask(text, alreadyTime) {
    const id = this.maxId;
    this.maxId += 1;
    const time = new Date();
    return {
      condition: 'active',
      text,
      id,
      time,
      alreadyTime,
    };
  }

  render() {
    const { todoData, tab } = this.state;
    return (
      <section className="todoapp">
        <NewTaskForm add={this.onAdd} />
        <section className="main">
          <TaskList
            todoData={todoData}
            tab={tab}
            markComplete={this.onMarkComplete}
            del={this.onDelete}
            edit={this.onEditing}
          />
          <Footer todoData={todoData} tab={tab} onTab={this.onTab} deleteCompleted={this.onDeleteCompleted} />
        </section>
      </section>
    );
  }
}

export default App;
