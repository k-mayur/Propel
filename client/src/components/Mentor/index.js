/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";

import AddTask from "./addTaskForm";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import EnhancedTable from './trainees'
import FullScreenDialog from './traineeTasks'


export default class Todos extends Component {
  state = {
    todos: [],
    trainees: [],
    options: [],
    taskId: "",
    traineeId: [],
    status: [],
    traineeData: [],
  };

  componentDidMount = () => {
    axios.get("http://localhost:4000/api/tasks").then(res => {
      console.log(res);
      const todos = res.data;
      this.setState({ todos: todos.tasks });
    });

    axios
      .get("http://localhost:4000/api/userTasks/users/trainee ")
      .then(res => {
        const trainees = res.data.users.map(user => {
          return { id: user["_id"], name: user.name };
        });
        // console.log(trainees);
        this.setState({ options: [...trainees] });
        const status = res.data.users.map(user => {
          return user.tasks.map(task => {
            return { task: task.task, status: task.status };
          });
        });


        const trainee = res.data.users.map(user => {
          return {
            name: user.name,
            task: user.tasks.map(task => task.task),
            status: user.tasks.map(task => task.status),
          };
        });

        // console.log(trainee);
        this.setState({ traineeData: [...trainee] });
        console.log(this.state.traineeData);

      });
  };

  addTodo = todo => {
    axios
      .post("http://localhost:4000/api/tasks/add", todo)
      .then(res => {
        const data = res.data.task;
        const updateTodos = [...this.state.todos];
        updateTodos.push(data);
        this.setState({ todos: updateTodos });
      })
      .catch(err => console.log(err));
  };

  deleteTodo = id => {
    let isDelete = confirm("Do you want to delete?");
    if (isDelete) {
      axios.delete(`http://localhost:4000/api/tasks/delete/${id}`).then(res => {
        this.state.todos = this.state.todos.filter(data => {
          return data["_id"] !== id;
        });
        this.setState({});
      });
    }
  };

  handleChange = e => {
    this.setState({ trainees: e.target.value });
  };

  assignTask = () => {
    this.state.trainees.forEach(trainee => {
      axios
        .put("http://localhost:4000/api/userTasks/task/assign", {
          taskId: this.state.taskId,
          traineeId: trainee,
        })
        .then(res => {
          alert("task assigned");
        })
        .catch(err => alert("error"));
    });
  };

  getTodoId = e => {
    // console.log(e.target.name);
    this.setState({ taskId: e.target.id });
    var checkboxes = document.getElementsByName("check");
    checkboxes.forEach(item => {
      // console.log(item);
      if (item.id !== e.target.id) item.checked = false;
    });
  };

  // statusHandleChange = e => {
  //   // console.log(e.target);
  //   this.state.traineeData.forEach(obj => {
  //     if (obj.id === e.target.value[0]) {
  //       this.state.traineeData.forEach(obj => {
  //         return obj.task.map(data => {
  //           return(
  //             <h4>{data}</h4>
  //           )
  //         })
  //       })
  //     }
  //   })
  // };

  render() {
    const todos = this.state.todos;
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
            <span>
              <form action="#">
                <p>
                  <label>
                    <input
                      type="checkbox"
                      id={todo["_id"]}
                      name="check"
                      onClick={this.getTodoId}
                    />
                    <span>{todo.task}</span>
                  </label>
                </p>
              </form>
            </span>
            <i
              class="material-icons"
              onClick={() => {
                this.deleteTodo(todo["_id"]);
              }}
              style={{ cursor: "pointer" }}
            >
              delete
            </i>
          </div>
        );
      })
    ) : (
      <p>No tasks yet</p>
    );

    return (
      <div className="container">
        {/* <EnhancedTable/> */}
        <FullScreenDialog  data={this.state.options}/>
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <div class="black-text">
            <h3 className="card-title">Create Task</h3>
            <AddTask addTodo={this.addTodo} />
            <h6 className="card-title">List of Tasks</h6>
            <span>{todoList}</span>
          </div>
        </div>
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <h6 className="card-title" style={{ marginBottom: "40px" }}>
            Assign Task
          </h6>
          <Select
            multiple
            value={this.state.trainees}
            onChange={this.handleChange}
            input={<Input id="select-multiple" />}
            placeholder="choose trainee"
            style={{ marginLeft: "1rem" }}
          >
            {this.state.options.map(option => {
              return <MenuItem value={option.id}>{option.name}</MenuItem>;
            })}
          </Select>
          <a
            class="waves-effect waves-light btn-small"
            onClick={this.assignTask}
            style={{ marginLeft: "1rem" }}
          >
            Assign
          </a>
        </div>
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <h6 className="card-title" style={{ marginBottom: "40px" }}>
            List of Trainees
          </h6>
          {/* {this.state.traineeData.map(trainee => {
            return (
              <div>
                <div className="left-align">
                  <span>{trainee.name}</span>
                </div>
              </div>
            );
          })} */}
          <DraggableDialog data={this.state.options} />
        </div>
      </div>
    );
  }
}
