import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import Error from "./components/Error/Error";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import PrivateRoute from "./components/PrivetRoutes/PriveteRoutes";
import Dashboard from "./components/Dashbard/Dashboard";
import Mentor from "./components/Mentor";
import Trainee from "./components/Trainee/index";
import classes from "./App.css";

class App extends React.Component {
  render() {
    let classBg;
    this.props.auth.isAuthenticated
      ? (classBg = classes.wrap1)
      : (classBg = classes.wrap);
    return (
      <div className={classBg}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/mentor" component={Mentor} />
            <PrivateRoute exact path="/trainee" component={Trainee} />
            <Route component={Error} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.login
});
export default connect(mapStateToProps)(App);
