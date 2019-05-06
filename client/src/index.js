import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import thunk from "redux-thunk";
import errorReducer from "./store/reducers/errorReducers";
import loginReducer from "./store/reducers/login";
import traineeReducer from "./store/reducers/trainee";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./store/actions/login";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import * as serviceWorker from "./serviceWorker";
import Axios from "axios";

const rootReducer = combineReducers({
  login: loginReducer,
  error: errorReducer,
  tasks: traineeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const getUser = () => {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  Axios.get(`http://localhost:4000/api/userTasks/users/me`)
    .then(res => {
      console.log(res.user);
      store.dispatch(setCurrentUser(res.user));
    })
    .catch(err => console.log(err));
};

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  //getUser();
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
