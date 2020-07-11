import React from 'react';
import NewTaskForm from '../new-task-form';
import TaskList from '../task-list';
import Footer from '../footer';
import './app.css';

class App extends React.Component {
  maxId = 100;

  timers = {};

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
      this.onTimerOff(id);
      const index = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  onAdd = (text, alreadyTime) => {
    const item = this.createTask(text, alreadyTime);
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
      const newArray = todoData.filter((item) => {
        if (item.condition === 'completed') this.onTimerOff(item.id);
        return item.condition !== 'completed';
      });
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

  onTimerOn = (id) => {
    if (this.timers[id]) return;
    this.timers[id] = setInterval(() => {
      const { todoData } = this.state;
      const i = todoData.findIndex((el) => el.id === id);
      const [min, sec] = todoData[i].alreadyTime;
      this.onEditing(id, { alreadyTime: [min, sec + 1] });
    }, 1000);
  };

  onTimerOff = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];
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
            timerOn={this.onTimerOn}
            timerOff={this.onTimerOff}
          />
          <Footer todoData={todoData} tab={tab} onTab={this.onTab} deleteCompleted={this.onDeleteCompleted} />
        </section>
      </section>
    );
  }
}

export default App;
