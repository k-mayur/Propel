/* eslint-disable no-restricted-globals */
/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import axios from "axios";
import AddTask from "./addTaskForm";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import FullScreenDialog from "./traineeTasks";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    margin: "5em"
  },
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  button: {
    display: "block",
    marginTop: theme.spacing.unit * 2
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  }
});

class Todos extends Component {
  state = {
    todos: [],
    trainees: [],
    options: [],
    taskId: "",
    traineeId: [],
    status: [],
    traineeData: []
  };

  componentDidMount = () => {
    axios.get("http://localhost:4000/api/tasks").then(res => {
      const todos = res.data;
      this.setState({ todos: todos.tasks });
    });

    axios
      .get("http://localhost:4000/api/userTasks/users/trainee ")
      .then(res => {
        const trainees = res.data.users.map(user => {
          return { id: user["_id"], name: user.name };
        });
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
            status: user.tasks.map(task => task.status)
          };
        });
        this.setState({ traineeData: [...trainee] });
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
    if (this.state.taskId === "" || this.state.trainees.length === 0)
      return alert("Select Task and trainees");
    this.state.trainees.forEach(trainee => {
      axios
        .put("http://localhost:4000/api/userTasks/task/assign", {
          taskId: this.state.taskId,
          traineeId: trainee
        })
        .then(res => {
          alert("task assigned");
        })
        .catch(err => alert("error"));
    });
  };

  getTodoId = e => {
    if (e.target.checked) this.setState({ taskId: e.target.id });
    if (!e.target.checked) this.setState({ taskId: "" });
    var checkboxes = document.getElementsByName("check");
    checkboxes.forEach(item => {
      if (item.id !== e.target.id) item.checked = false;
    });
  };

  render() {
    const { classes } = this.props;
    const todos = this.state.todos;
    const todoList = todos.length ? (
      todos.map(todo => {
        return (
          <div
            className="left-align"
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "space-between"
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
      <div className={classes.container}>
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <div class="black-text">
            <h3>Create Task</h3>
            <AddTask addTodo={this.addTodo} />
            <h6>List of Tasks</h6>
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
          <form className="select" autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">
                Trainees
              </InputLabel>
              <Select
                multiple
                className="col s6"
                value={this.state.trainees}
                onChange={this.handleChange}
                input={<Input id="select-multiple" />}
                placeholder="choose trainee"
                style={{ width: "300px" }}
                inputProps={{
                  id: "demo-controlled-open-select"
                }}
              >
                {this.state.options.map(option => {
                  return <MenuItem value={option.id}>{option.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <a
              className="waves-effect waves-light btn-small col s6"
              onClick={this.assignTask}
              style={{ marginLeft: "2rem", float: "right", color: "white" }}
            >
              Assign
            </a>
          </form>
        </div>
        <div
          className="card white-grey card-panel hoverable"
          style={{ width: "100%" }}
        >
          <h6 className="card-title" style={{ marginBottom: "40px" }}>
            Check progress of Trainee
          </h6>
          <FullScreenDialog data={this.state.options} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Todos);
