import React from "react";
import "./tasks-filter.css";

class TasksFilter extends React.Component {
  // createButton(name, tab, fn, text) {
  //   if (name === tab) {
  //     return (
  //       <li>
  //         <button
  //           className="selected"
  //           name={name}
  //           onClick={(e) => fn(e.target.name)}
  //         >
  //           {text}
  //         </button>
  //       </li>
  //     );
  //   }
  // }

  render() {
    const { onTab } = this.props;

    return (
      <ul className="filters">
        <li>
          <button name="all" onClick={(e) => onTab(e.target.name)}>
            All
          </button>
        </li>
        <li>
          <button name="active" onClick={(e) => onTab(e.target.name)}>
            Active
          </button>
        </li>
        <li>
          <button name="completed" onClick={(e) => onTab(e.target.name)}>
            Completed
          </button>
        </li>
      </ul>
    );
  }
}
export default TasksFilter;
