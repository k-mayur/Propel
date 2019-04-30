import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivetRoutes/PriveteRoutes";
// import Dashboard from "./components/Dashbard/Dashboard";
// import Mentor from "./components/Mentor/createTask";
// import Task from "./components/Mentor/taskList";
import Todos from "./Todos";
import classes from "./App.css";
// import AddTask from "./store/Containers/AddTask";
// import VisibleTaskList from "./store/Containers/VisibleTaskList";

class App extends React.Component {
  render() {
    return (
      <div className={classes.wrap}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <PrivateRoute exact path="/dashboard" component={Todos} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
