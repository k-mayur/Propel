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
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({
      task: "",
      createdBy: "",
      dueDate: "",
    });
  };
  render() {
    return (
      <div class="row">
        {/* <form onSubmit={this.handleSubmit}>
          <label>Add new task:</label>
          <input
            type="text"
            onChange={this.handleContentChange}
            value={this.state.content}
          />
          <label>Created By:</label>
          <input
            type="text"
            onChange={this.handleCreatedChange}
            value={this.state.content}
          />
          <label>Due date:</label>
          <input
            type="text"
            onChange={this.handleDateChange}
            value={this.state.content}
            className = "datepicker"
          />
        </form> */}
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="add_task"
                type="text"
                class="validate"
                onChange={this.handleTaskChange}
                value={this.state.task}
              />
              <label for="add_task">Add task:</label>
            </div>
            <div className="input-field col s6">
              <input
                id="created_by"
                type="text"
                class="validate"
                onChange={this.handleCreatedChange}
                value={this.state.createdBy}
              />
              <label for="created_by">Created by:</label>
            </div>
            <div className="input-field col s6">
              <input
                type="date"
                class="datepicker"
                onChange={this.handleDateChange}
                value={this.state.dueDate}
              />
              <label for="due_Date">Due date:</label>
            </div>
          </div>
          <button
            class="btn waves-effect waves-light btn-small"
            type="submit"
            name="action"
            onClick={this.handleSubmit}
          >
            Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}
