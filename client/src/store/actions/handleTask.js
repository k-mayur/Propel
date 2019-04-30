import {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK,
  SET_VISIBILITY_FILTER,
} from "../constants/action-types";

let taskId = 2;

export const addTask = text => ({
  type: ADD_TASK,
  id: taskId++,
  text,
});

export const deleteTask = id => ({
  type: REMOVE_TASK,
  id: id,
});

export const toggleTask = id => ({
  type: TOGGLE_TASK,
  id: id,
});

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});
