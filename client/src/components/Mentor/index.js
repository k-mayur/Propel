/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
// import "./Todos.css"
// import $ from "jquery";
import AddTask from "./addTaskForm";
// import { error } from "util";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import { Dropdown } from "semantic-ui-react";

export default class Todos extends Component {
  state = {
    todos: [],
    trainees: [],
    options: [],
  };

  options = ["Pratip", "Harsha", "Mayur"];

  componentDidMount = () => {
    axios.get("http://localhost:4000/api/tasks").then(res => {
      const todos = res.data;
      this.setState({ todos: todos.tasks });
    });
    // console.log(this.state.todos);
  };

  addTodo = todo => {
    // todo.id = Math.random();
    // let todos = [...this.state.todos, todo];
    // this.setState({
    //   todos: todos,
    // });

    // console.log(todo);
    axios
      .post("http://localhost:4000/api/tasks/add", todo)
      .then(res => {
        const data = res.data.task;
        // const newTodo = {
        //   task: data.task,
        //   createdBy: data.createdBy,
        //   dueDate: data.dueDate,
        // };
        const updateTodos = [...this.state.todos];
        updateTodos.push(data);
        this.setState({ todos: updateTodos });
      })
      .catch(err => console.log(err));
  };

  deleteTodo = id => {
    //   console.log(id);
    let isDelete = confirm("Do you want to delete?");
    if (isDelete) {
      axios.delete(`http://localhost:4000/api/tasks/${id}`).then(res => {
        this.state.todos = this.state.todos.filter(data => {
          return data["_id"] !== id;
        });
        this.setState({});
      });
    }
  };

  handleChange = e => {
    this.setState({ options: e.target.value });
    // console.log(e.target.value);
  };

  render() {
    const todos = this.state.todos;
    // const trainees = this.state.trainees;
    // console.log(todos);
    const todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div
            className="left-align"
            style={{
              margin: "50px",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={todo.id}
          >
            <span
              onClick={() => {
                this.deleteTodo(todo["_id"]);
              }}
            >
              <h5
                style={{
                  borderBottom: "1px solid #8080803b",
                  fontWeight: "100",
                }}
              >
                {todo.task}
              </h5>
            </span>
            <span>
              <span style={{ fontWeight: "100", marginRight: "1rem" }}>
                assign to:{" "}
              </span>

              <Select
                multiple
                value={this.state.options}
                onChange={this.handleChange}
                input={<Input id="select-multiple" />}
              >
                {this.options.map(option => {
                  return <MenuItem value={option}>{option}</MenuItem>;
                })}
              </Select>
            </span>
          </div>
        );
      })
    ) : (
      <p>No tasks yet</p>
    );

    return (
      <div
        className="container"
        style={{
          display: "flex",
          position: "absolute",
          top: "5rem",
          left: "20rem",
        }}
      >
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <div class="black-text">
            <h3 className="card-title">Create Task</h3>
            <AddTask addTodo={this.addTodo} />
            <h6 className="card-title">List of Tasks</h6>
            <span>{todoList}</span>
            <h6 className="card-title">List of Trainees</h6>
          </div>
        </div>
      </div>
    );
  }
}
