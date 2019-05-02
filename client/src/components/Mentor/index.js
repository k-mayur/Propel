/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
// import "./Todos.css"
// import $ from "jquery";
import AddTask from "./addTaskForm";

// $(document).ready(function() {
//   $('select').material_select();
// });

export default class Todos extends Component {
  state = {
    todos: [],
    trainees: [],
  };

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

    console.log(todo);
    axios.post("http://localhost:4000/api/tasks/add", { todo }).then(res => {
      console.log(res);
    });
  };
  render() {
    const todos = this.state.todos;
    // const trainees = this.state.trainees;
    // console.log(todos);
    const todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div className="collection-item todoItem" key={todo.id}>
            <span
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              {todo.task}
            </span>
            <h6>assigned to: </h6>

            <div className="input-field col s12 ">
              {/* <select multiple>
                <option value="">
                  choose trainee
                </option>
                {trainees.map(trainee => {
                  return <option value={trainee.name}>{trainee.name}</option>;
                })}
              </select> */}
              <a class="dropdown-trigger btn" href="#" data-target="dropdown1">
                Choose trainee!
              </a>
              <ul id="dropdown1" class="dropdown-content">
                <li>
                  <a href="#!">one</a>
                </li>
                <li>
                  <a href="#!">two</a>
                </li>
                <li class="divider" tabindex="-1" />
                <li>
                  <a href="#!">three</a>
                </li>
                <li>
                  <a href="#!">
                    <i class="material-icons">view_module</i>four
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <i class="material-icons">cloud</i>five
                  </a>
                </li>
              </ul>
            </div>
          </div>
        );
      })
    ) : (
      <p>No tasks yet</p>
    );

    const deleteTodo = id => {
      const todos = this.state.todos.filter(todo => {
        return todo.id !== id;
      });
      this.setState({
        todos: todos,
      });
    };

    return (
      <div>
        <div className="todo-app container">
          <h1 className="center blue-text">Tasks</h1>
          <AddTask addTodo={this.addTodo} />
          <div className="todos collection">{todoList}</div>
        </div>
      </div>
    );
  }
}
