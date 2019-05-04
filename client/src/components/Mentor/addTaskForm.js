import React, { Component } from "react";

export default class AddTaskForm extends Component {
  state = {
    task: "",
    createdBy: "",
    dueDate: "",
  };
  handleTaskChange = e => {
    this.setState({
      task: e.target.value,
    });
  };

  handleCreatedChange = e => {
    this.setState({
      createdBy: e.target.value,
    });
  };

  handleDateChange = e => {
    this.setState({
      dueDate: e.target.value,
    });
  };

  handleSubmit = e => {
    if (this.state.task === '' || this.state.dueDate==='')return alert('Task and duedate cannot be null');
    else {
      e.preventDefault();
      this.props.addTodo(this.state);
      this.setState({
        task: "",
        createdBy: "",
        dueDate: "",
      });
    }
  };
  render() {
    return (
      <form className="col s12 white-text">
        <div className="row">
          <div className="input-field col s5">
            <input
              id="add_task"
              type="text"
              class="validate"
              onChange={this.handleTaskChange}
              value={this.state.task}
            />
            <label for="add_task">Add task:</label>
          </div>
          <div className="input-field col s5">
            <input
              type="date"
              class="datepicker"
              z-depth-5
              onChange={this.handleDateChange}
              value={this.state.dueDate}
            />
            <label for="due_Date">Due date:</label>
          </div>
          <div className="input-field col s2">
            <button
              class="btn waves-effect waves-light btn-small"
              type="submit"
              name="action"
              onClick={this.handleSubmit}
            >
              Create
                </button>
          </div>
        </div>
      </form>
    );
  }
}
