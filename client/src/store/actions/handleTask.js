import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  SET_VISIBILITY_FILTER,
} from "../actions/actionTypes";

let taskId = 0;

export const addTask = text => {
  return {
    type: ADD_TASK,
    id: taskId++,
    text,
    completed: false,
  };
};

export const deleteTask = id => {
  return {
    type: REMOVE_TASK,
    id: id,
  };
};

export const toggleTask = id => {
  return {
    type: TOGGLE_TASK,
    id,
  };
};

export const setVisibilityFilter = filter => {
  return {
    type: SET_VISIBILITY_FILTER,
    filter,
  };
};
