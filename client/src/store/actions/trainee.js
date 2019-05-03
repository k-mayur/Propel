import { FETCH_TASKS, UPDATE_TASKS, ADD_TASKS, DELETE_TASKS} from "./actionTypes";
import axios from "axios";


export const fetchTasks = (userId) => dispatch => {
    axios
        .get(`http://localhost:4000/api/userTasks/${userId}`)
        .then(res => {
            dispatch({
                type: FETCH_TASKS,
                payload: res
            })
        })
        .catch(err => console.log(err));
};
export const updateTasks = (data) => dispatch => {
    axios
        .put(`http://localhost:4000/api/userTasks/update`, data)
        .then(res => {
            dispatch({
                type: UPDATE_TASKS,
                payload: res.data.tasks
            })
        })
        .catch(err => console.log(err));
}
export const addTasks = (data) => dispatch => {
    axios
        .post(`http://localhost:4000/api/userTasks/add`,data)
        .then(res => {
            dispatch({
                type: ADD_TASKS,
                payload: res.data.tasks
            })
        })
        .catch(err => console.log(err));
}
export const deleteTask = (data) => dispatch => {
    axios
        .put(`http://localhost:4000/api/userTasks/delete`, data)
        .then(res => {
            dispatch({
                type: DELETE_TASKS,
                payload: data
            })
        })
        .catch(err => console.log(err));
}