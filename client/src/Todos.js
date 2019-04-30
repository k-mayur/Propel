import React, { Component } from "react";
// import "./Todos.css"
import AddTask from "./AddTaskForm";

export default class Todos extends Component {
  state = {
    todos: [
      { id: 1, content: "eat" },
      { id: 2, content: "sleep" },
      { id: 3, content: "code" },
    ],
  };
   addTodo = todo => {
    todo.is = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({
      todos: todos,
    });
  };
  render() {
    const todos = this.state.todos;
    const todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div className="collection-item todoItem" key={todo.id}>
            <span
              onClick={() => {
                deleteTodo(todo.id);
              }}
            >
              {todo.content}
            </span>
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
