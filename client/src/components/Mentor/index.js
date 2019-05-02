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
        const data = res.data;
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
            className="collection-item todoItem "
            style={{ margin: "50px" }}
            key={todo.id}
          >
            <span
              onClick={() => {
                this.deleteTodo(todo["_id"]);
              }}
            >
              <h4 class="z-depth-5">{todo.task}</h4>
            </span>
            <span style={{ marginTop: "20px", marginRight: "2rem" }}>
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
          </div>
        );
      })
    ) : (
      <p>No tasks yet</p>
    );

    return (
      <div>
        <div className="todo-app container">
          <AddTask addTodo={this.addTodo} />
          <h1 className="center blue-text">
            List of Tasks
          </h1>
          <div className=" card-content">{todoList}</div>
        </div>
      </div>
    );
  }
}
